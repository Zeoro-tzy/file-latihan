const express = require("express");
const rute = express.Router();
const schemaRegister = require("../Models/4register")
const bcrypt = require("bcryptjs");
const {registerValidation} = require("./5hapijoi");
const jwt = require("jsonwebtoken");


rute.post("/register",async(req,res) => {

    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).json({
            status : res.statusCode,
            message : error.details[0].message
        })
    }
    
    //Cek email
    const emailExist = await schemaRegister.findOne({email : req.body.email});
    if(emailExist) return res.status(400).json({message : "Email sudah digunakan"});
    


    //Hash Password
    const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        const user = new schemaRegister({
            nama : req.body.nama,
            email : req.body.email,
            password : hashPassword
        })
        
        try{
        const saveUser = await user.save();
        res.status(200).json(saveUser)
    }catch(err){
        res.status(400).json({err});
    }
})

rute.post("/login",async(req,res) => {
    //if email exist
    const user = await schemaRegister.findOne({email : req.body.email});
    if(!user) return res.status(400).json({
        status : res.statusCode,
        message : "Email Salah"
    })

    //cek password
    const validPwd = await bcrypt.compare(req.body.password,user.password)
    if(!validPwd) return res.status(400).json({
        status : res.statusCode,
        message : "Password anda salah"
    })

    //Membuat token menggunakan jwt
    const token = jwt.sign({_id : user._id},process.env.SECRET_KEY)
    res.header('nama-token',token).json({
        message : "Berhasil Login",
        token : token
    })
})


module.exports = rute;