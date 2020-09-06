
const router=require("express").Router();

const mongoose = require("mongoose");
const User =require("../models/crudmodel");
const verified=require("../middleware/verifyToken");
//fetch all data
router.get("/fetchall",verified, (req, res) => {
     User.find({ postedBy : req.user._id }).populate("postedBy",)
         .then(data => {
             res.json({ data })
         })
         .catch(err => {
             console.log(err)
         })
 });
 //req.user = userdata .populate("postedBy","_id name")
 //insert data
 
 router.post('/adduser',verified,(req, res) => {
     const { name} = req.body
     
     const post = new User({
         name
     })
     post.save()
     .then(result => {
             res.json({ post: result })
         })
     .catch(err => {
             console.log(err)
         })
 })
 
 //delete user
 
 router.delete('/delete/:id', verified,(req, res) => {
     User.findOne({ _id: req.params.id })
         .then(data => {
             data.remove()
             res.json(data)
         })
         .catch(err => {
             console.log(err)
         })
 })
 
 //fetch user by id
 
 router.get('/fetch/:id',verified, (req, res) => {
     User.findOne({ _id: req.params.id })
         .then(data => {
             res.json(data)
         })
         .catch(err => {
             console.log(err)
         })
 })
 
 //update user by id 
 
 router.put('/update/:id', verified,(req, res) => {
 
     const Id = req.params.id;
     var name = { $set: { name: req.body.name } };
     
 
     User.findByIdAndUpdate({ _id: Id }, name)
         .then(data => {
             res.json(data)
         }).catch(err => { console.log(err) })
 
     // User.findOneAndUpdate(req.body.id, name)
     // .then(data =>{
     //     res.json(data)
     // })
     // .catch(err=>{console.log(err)})
 
     // User.updateOne(req.param.id,{
     //     $set:{name: req.body.name}
     // }).then(result=>{
     //     res.json(result)
     // },{
     //     new:true
     // }).catch(err=>{
     //     return res.status(422).json({error:err})
     // })
 
 
 })
 
 
 module.exports = router