const router = require('express').Router()
const authController = require('../controllers/authController')

router.post('/login', authController.login)
  .post('/register', authController.register)
  .delete('/:id', authController.deleteAccount)

module.exports = router
