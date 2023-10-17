const express = require('express')
const router = express.Router()
const controller = require('../Controller/AppController')

//middleware 
const tryCatch = require('../MiddleWare/ErrorHandler')

router.get('/register',controller.register)

module.exports = router