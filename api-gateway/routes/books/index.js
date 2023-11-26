const router = require('express').Router()
const { status } = require('../../helpers/constants/constants')
const utility = require('../../helpers/utility')
const axios = require('axios')
const { BOOKS_SERVICE_URL } = process.env

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BOOKS_SERVICE_URL}/books`)
    return res.status(status.SUCCESS).send(response.data.data)
  } catch (error) {
    const message = error.response?.data ? error.response.data : MSG.somethingWentWrong
    return res.status(status.ERROR).send(utility.errorRes(message))
  }
})

router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${BOOKS_SERVICE_URL}/books`, req.body)
    return res.status(status.SUCCESS).send(response.data.data)
  } catch (error) {
    const message = error.response?.data ? error.response.data : MSG.somethingWentWrong
    return res.status(status.ERROR).send(utility.errorRes(message))
  }
})

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${BOOKS_SERVICE_URL}/books/${req.params.id}`)
    return res.status(status.SUCCESS).send(response.data.data)
  } catch (error) {
    console.log(error)
    const message = error.response?.data ? error.response.data : MSG.somethingWentWrong
    return res.status(status.ERROR).send(utility.errorRes(message))
  }
})

router.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${BOOKS_SERVICE_URL}/books/${req.params.id}`, req.body)
    return res.status(status.SUCCESS).send(response.data.data)
  } catch (error) {
    console.log(error)
    const message = error.response?.data ? error.response.data : MSG.somethingWentWrong
    return res.status(status.ERROR).send(utility.errorRes(message))
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${BOOKS_SERVICE_URL}/books/${req.params.id}`)
    return res.status(status.SUCCESS).send(response.data.data)
  } catch (error) {
    console.log(error)
    const message = error.response?.data ? error.response.data : MSG.somethingWentWrong
    return res.status(status.ERROR).send(utility.errorRes(message))
  }
})

module.exports = router