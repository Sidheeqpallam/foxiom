const router = require('express').Router()
const { status } = require('../helpers/constants/constants')
const utility = require('../helpers/utility')
const bookController = require('../controllers/booksController')


/* GET home page. */
router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes('Foxiom Rest API', [])))

router.post('/books', bookController.createBook)
router.get('/books', bookController.getAllBooks)
router.get('/books/:id', bookController.getBook)
router.put('/books/:id', bookController.updateBook)
router.delete('/books/:id', bookController.deleteBook)

module.exports = router
