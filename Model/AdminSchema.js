const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    name:String,
    username:String,
    password:String
})
module.exports = mongoose.model('admindetails',adminSchema)