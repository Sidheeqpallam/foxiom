const router = require('express').Router()
const { status } = require('../helpers/constants/constants')
const utility = require('../helpers/utility')
const versionRouter = require('./versionRouter')


/* GET home page. */
router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes('Foxiom Rest API', [])))

router.use('/v1', versionRouter)

module.exports = router
