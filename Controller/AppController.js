const mongoose = require("mongoose");
const userdb = require("../Model/UserSchema");
const admindb = require("../Model/AdminSchema");

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
    console.log(email);
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
    const check = await admindb.findOne({username:username,password:password})

    if(!check){
        return res.status(404).json({message:"user not found"})
    }
    else{
        res.json({message:"user found successfully"})
    }
    

  }
};
