const express = require("express");
const rute = express.Router();
const inputTeks = require("../Models/1inputTeks");
const verifyToken = require("../Controllers/jwt");


rute.get("/inputTeks",verifyToken,async(req,res) => {
    try{
        const input = await inputTeks.find({userId : req.user._id});
        if(!input || input.length === 0) return res.status(400).json(err);
          // Mengambil data tasks dari setiap item dalam array input
          const tasksData = input.flatMap(item => item.tasks);
          console.log(input)
        res.status(200).json(tasksData);
    }catch(err){
        res.status(404).json({message : err.message})
    }
})

rute.get("/inputTeks/:id",async(req,res) => {
    try{
        const id = await inputTeks.findById(req.params._id);
        // const tasks = id.tasks.find(task => task._id )
        console.log(id)
        // if(!tasks){
        //     res.status(404).json({message : "Data tidak ditemukan"})
        // }
        res.status(200).json(id);
    }catch(err){
        res.status(500).json({message : err.message})
    }
})


rute.post("/inputTeks",verifyToken,async(req,res) => {
    try{
        const body = new inputTeks({
            userId : req.user._id,
            tasks : req.body.tasks
        });
        const saveData = await body.save();
        res.status(201).json(saveData);
    }catch(err){
        res.status(409).json({err : err.message})
    }
})


rute.patch("/inputTeks/:id",verifyToken,async(req,res) => {
    try{
        const id = req.params.id;
        const body = req.body;
        const updateData = await inputTeks.findByIdAndUpdate(id,body,{new : true});
        if(!updateData){
            res.status(404).json({message : err.message})
        }
        res.status(200).json(body);
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

rute.delete("/inputTeks/:id",async(req,res) => {
    try{
        const id = req.params.id;
        const delData = await inputTeks.findByIdAndDelete(id);
        if(!delData){
            res.status(404).json({message : "Data tidak ditemukan"})
        }
        res.status(200).json({message : "data berhasil dihapus"})
    }catch(err){

    }
})

module.exports = rute;