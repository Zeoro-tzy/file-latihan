require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//1.Input Teks
const inputTeksRute = require('./Controllers/input1Teks.js');

//2.Input Radio
const inputRadioRute = require("./Controllers/input2radio.js");

//3.Input Image
const inputImageRute = require("./Controllers/input3Img.js");

//4.Register
const registerUser = require("./Controllers/4register.js");

app.use(cors());

//Koneksi ke mongodb
mongoose.connect(mongoString);
const db = mongoose.connection;

db.once("connected",() => {
    console.log("Database Connected")
})

db.on("error",(err) => {
    console.log(err)
})

//1.Input Teks,Checkbox
app.use("/input",inputTeksRute);

//2.Input Radio Button
app.use("/inRad",inputRadioRute);


//Menyajikan file statis dari folder 'uploads" agar bisa tampil di browser
app.use("/uploadDonk",express.static('uploadsGambar'))

//3.Input Image
app.use("/inImg",inputImageRute)


//4.Register
app.use("/reg",registerUser);


app.listen(3001,() => {
    console.log("Server sudah berjalan")
})