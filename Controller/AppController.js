const mongoose = require("mongoose");
const userdb = require("../Model/UserSchema");
const admindb = require("../Model/AdminSchema");
const jwt = require('jsonwebtoken')
require('dotenv').config()
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

 

module.exports = {
  register: async (req, res) => {
    const { name, password, username, email } = req.body;

    if(!name || !password  || !username || !email){
      return res.status(400).json({message:"enter the required values {name,password,username,email} "})
    }


    await admindb.create({
      name,
      email,
      username,
      password,
    });
    res.send({ message: "Admin registration success" });
  },



  login:async (req,res)=>{
    const {username,password} = req.body

    if(!username ||!password){
      return res.status(400).json({message:"enter the required values {username,password} "})
    }

    const check = await admindb.findOne({username:username,password:password})
    if(!check){
        return res.status(404).json({message:"user not found"})
    }
    // console.log(process.env.ACCESS_TOKEN_SECRET)
    const token = jwt.sign({username:check.username},process.env.ACCESS_TOKEN_SECRET);
  
    res.json({message:"Welcome,your login was successful",token})
    //USE ONLY ONE RES. ,OTHERWISE APP WILL CRASH 

  },


  createUser:async(req,res)=>{
    const {name,email,username} = req.body;
   
   //simple validation using if 
    if(!name || !email || !username){
      return res.status(400).json({message:"enter the required values {name,email,username} "})
    }

    const photo = req.file ? req.file.filename:"";
    
    await userdb.create({name,email,username,photo});
    res.status(200).json({message:"user created success"})
  },


  showUsers:async(req,res)=>{
    const data = await userdb.find()
 
    if(data.length == 0){
     return res.status(404).json({message:"user collection is empty! Add Users"})
    }
    res.status(200).json({message:"successfully fetched user data",data})


  },


  userById:async(req,res)=>{
    const id =req.params.id
    const data = await userdb.findById(id)
    if(!data){
     return res.status(404).json({message:"user not found "})
    }
    res.status(200).json({message:"user found ",data})
  },

  updateById:async(req,res)=>{
    const id = req.params.id
    const {name,email,username} = req.body
    
    if(!name || !email || !username){
      return res.status(400).json({message:"enter the required values {name,email,username} "})
    }

   const updated =  await userdb.findByIdAndUpdate(id,{$set:{name,email,username}})  //name,email,username
  if(!updated){
   return  res.status(404).json({message:"user not found"})
  }

   res.status(200).json({message:"User Updated Successfully"})

  },


  deleteById:async(req,res)=>{
    const id = req.params.id
    const removeUser = await userdb.findByIdAndRemove(id)
    if(!removeUser){
      res.status(404).json({message:"user not found"})
    }
    res.status(200).json({message:"user deleted successfully"})
  }
};
