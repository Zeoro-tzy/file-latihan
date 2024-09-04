const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    nama : {
        type : String,
        required : true,
        max : 255
    },
    email : {
        type : String,
        required : true,
        max : 255
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 1024
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("User",userSchema)
