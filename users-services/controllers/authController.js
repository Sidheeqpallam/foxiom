const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const utility = require('../helpers/utility')
const { status, MSG } = require('../helpers/constants/constants')
const { validateEmail, validateMobile } = require('../helpers/validation')
const userModal = require('../models/Users')

const register = async (req, res) => {
  const {
    userPassword,
  } = req.body
  let {
    userName,
    userEmail,
    userMobileNo,
  } = req.body
  userName = utility.capitalizeString(userName)
  validateEmail(userEmail) ? null : userEmail = null
  validateMobile(userMobileNo) ? null : userMobileNo = null
  if (!userName || !userMobileNo || !userPassword) {
    return res.status(status.ERROR).send(utility.errorRes(MSG.missingRequiredData))
  }
  try {
    const existCustomer = await userModal.findOne({ userMobileNo })
    if (existCustomer) {
      return res.status(status.ERROR).send(utility.errorRes(MSG.userExist))
    }
    const userOtp = utility.generateOTP(6)
    const hashPassword = utility.hashPassword(userPassword)
    const newCustomer = new userModal({
      userName,
      userEmail,
      userMobileNo,
      userPassword: hashPassword,
      userOtp,
    })
    const response = await newCustomer.save()
    const { _id } = response
    const token = jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
    return res.status(status.SUCCESS)
      .send(utility.successRes(MSG.registeredSuccessfully,
        {
          token, user: {
            userName: response.userName,
            userMobileNo: response.userMobileNo,
            userEmail: response.userEmail,
          }
        }))
  } catch (error) {
    console.log(error)
    return res.status(status.ERROR).send(utility.errorRes(MSG.somethingWentWrong))
  }
}

const login = async (req, res) => {
  const {
    userMobileNo,
    userPassword,
  } = req.body
  if (!userMobileNo || !userPassword) {
    return res.status(status.ERROR).send(utility.errorRes(MSG.missingRequiredData))
  }
  try {
    const user = await userModal.findOne({ userMobileNo })
    if (!user || !(await bcrypt.compare(userPassword, user.userPassword))) {
      return res.status(status.ERROR).send(utility.errorRes(MSG.invalidCredentials))
    }
    const { _id } = user
    const token = jwt.sign({ _id }, process.env.TOKEN_SECRET, {
      expiresIn: '1h',
    })
    return res.status(status.SUCCESS).send(
      utility.successRes(MSG.successfulLogin, {
        token, user: {
          userName: user.userName,
          userMobileNo: user.userMobileNo,
          userEmail: user.userEmail
        }
      }),
    )
  } catch (error) {
    console.log(error)
    return res.status(status.ERROR).send(utility.errorRes(MSG.somethingWentWrong))
  }
}

module.exports = {
  register,
  login,
}
