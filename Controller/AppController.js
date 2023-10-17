const mongoose = require('mongoose')
const userdb = require('../Model/UserSchema')
const admindb = require('../Model/AdminSchema')

module.exports = {
    register: async(req,res)=>{
        const {name,password,username,email} = req.body
        await admindb.insert({
            name,
            email,
            username,
            password
        })
        res.send({message:"Admin registration success"})

    }
}