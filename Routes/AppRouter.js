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

router
.post('/register',tryCatch(controller.register))
.post('/login',tryCatch(controller.login))
.use(verifyToken)

// //photo1 is the name given for file 
.post('/users',upload.single('photo1'),tryCatch(controller.createUser))
.get('/users',tryCatch(controller.showUsers))
.get('/users/:id',tryCatch(controller.userById))
.put('/users/:id',tryCatch(controller.updateById))
.delete('/users/:id',tryCatch(controller.deleteById))



//short version of the above code 
// router
//   .post('/register', tryCatch(controller.register))
//   .post('/login', tryCatch(controller.login))
//   .route('/users')
//   .post(verifyToken, upload.single('photo1'), tryCatch(controller.createUser))
//   .get(verifyToken, tryCatch(controller.showUsers));
// router
//   .route('/users/:id')
//   .get(verifyToken, tryCatch(controller.userById))
//   .put(verifyToken, tryCatch(controller.updateById))
//   .delete(verifyToken, tryCatch(controller.deleteById));


module.exports = router