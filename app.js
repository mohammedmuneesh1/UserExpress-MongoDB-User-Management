const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userRouter = require('./Routes/AppRouter') 


app.use(express.json())
app.use('/adminpanel',userRouter)








const port = 3000
app.listen(port,()=>{
    console.log("http://localhost:3000")
} )