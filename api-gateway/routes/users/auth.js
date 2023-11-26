const router = require('express').Router()
const { status, MSG } = require('../../helpers/constants/constants')
const utility = require('../../helpers/utility')
const axios = require('axios')
const { USER_SERVICE_URL } = process.env


router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes('Foxiom Rest API', [])))

router.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/register`, req.body)
    return res.status(status.SUCCESS).send(response.data.data)
  } catch (error) {
    console.log(error)
    const message = error.response?.data ? error.response.data : MSG.somethingWentWrong
    return res.status(status.ERROR).send(utility.errorRes(message))
  }
})

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/login`, req.body)
    return res.status(status.SUCCESS).send(response.data.data)
  } catch (error) {
    const message = error.response?.data ? error.response.data : MSG.somethingWentWrong
    return res.status(status.ERROR).send(utility.errorRes(message))
  }
})

module.exports = router
