const jwt = require('jsonwebtoken')
const { MSG } = require('../helpers/constants/constants')
const utility = require('../helpers/utility')
const { status } = require('../helpers/constants/constants')

const verifyMyToken = async (req, res, next) => {
  const token = req.headers.authorization
  try {
    if (!token) {
      return res.status(status.UNAUTHORIZED).send(MSG.notAuthorized)
    }
    const userToken = token.split(' ')[1]
    const verify = jwt.verify(userToken, `${process.env.TOKEN_SECRET}`)
    if (!verify) {
      return res.status(status.UNAUTHORIZED).send(utility.errorRes(MSG.notAuthorized))
    }
    if (!verify) {
      return res.status(status.UNAUTHORIZED).send(utility.errorRes(MSG.notAuthorized))
    }
    req.user = verify
    return next()
  } catch (err) {
    console.log('Error Occured in Auth middleware', err)
    return res.status(status.UNAUTHORIZED).send(utility.errorRes('Session Expired', status.UNAUTHORIZED))
  }
}

module.exports = {
  verifyMyToken,
}
