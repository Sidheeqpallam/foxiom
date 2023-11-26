const router = require('express').Router()
const { status } = require('../../helpers/constants/constants')
const utility = require('../../helpers/utility')
const authRouter = require('./auth')

router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes('Foxiom Rest API', [])))

router.use('/auth', authRouter)

module.exports = router