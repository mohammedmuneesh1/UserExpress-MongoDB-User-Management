const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userRouter = require('./Routes/AppRouter') 


app.use(express.json())
app.use('/adminpanel',userRouter)




//mongo db start

mongoose.connect("mongodb://localhost:27017/usermanagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//mongo db ends



const port = 3000
app.listen(port,()=>{
    console.log("http://localhost:3000")
} )