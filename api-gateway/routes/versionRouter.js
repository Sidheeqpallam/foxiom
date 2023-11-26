const router = require('express').Router()
const { status } = require('../helpers/constants/constants')
const utility = require('../helpers/utility')
const userRouter = require('./users')
const booksRouter = require('./books')
const authMiddleware = require('../middlewares/auth')


/* GET home page. */
router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes('Foxiom Rest API', [])))

router.use('/users', userRouter)
router.use('/books', authMiddleware.verifyMyToken, booksRouter)

module.exports = router
