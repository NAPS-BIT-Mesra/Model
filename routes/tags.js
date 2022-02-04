const express = require("express")
const router = express.Router()
const tags = require("../models/tags")


router.get("/", async(req,res)=>{
  try{
    const Tags = await tags.find()
    res.json(Tags)
  }catch (err){
    res.status(500).json({ message: err.message })
  }
})


router.post("/",async(req,res)=>{
  const Tag = new tags({
    title: req.body.title,
  })
  try{
    const newTag = await Tag.save()
    res.status(201).send(newTag);
  }catch (err) {
    res.status(400).json({message: err.message})
  }
})

module.exports = router