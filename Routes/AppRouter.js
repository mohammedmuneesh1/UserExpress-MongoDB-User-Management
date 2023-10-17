const express = require('express')
const router = express.Router()
const controller = require('../Controller/AppController')

//middleware 
const tryCatch = require('../MiddleWare/ErrorHandler')

router.post('/register',controller.register)
router.post('/login',controller.login)

module.exports = router