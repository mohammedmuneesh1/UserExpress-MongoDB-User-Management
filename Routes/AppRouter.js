const express = require('express')
const router = express.Router()
const controller = require('../Controller/AppController')
const multer = require('multer')
//middleware start
const tryCatch = require('../MiddleWare/ErrorHandler')
const verifyToken = require('../MiddleWare/AuthMiddleware')
//middleware end

//multer start

const storage = multer.diskStorage({destination:'userphoto/', filename:(req,file,cb)=>cb(null,Date.now() + file.originalname)}) //removed { } because arrow fn in single line 
const upload = multer({storage})
//multer end

router.post('/register',tryCatch(controller.register))
router.post('/login',tryCatch(controller.login))
router.post('/users',verifyToken,upload.single('photo1'),tryCatch(controller.createUser))
//photo1 is the name given for file 
router.get('/users',verifyToken,tryCatch(controller.showUsers))
router.get('/users/:id',verifyToken,tryCatch(controller.userById))
 router.put('/users/:id',verifyToken,tryCatch(controller.updateById))
 router.delete('/users/:id',verifyToken,tryCatch(controller.deleteById))
module.exports = router