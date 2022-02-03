const express = require("express")
const router = express.Router()
const authorschema = require("../models/author")
const blog = require("../models/blog")
// Data -> Name, Photo, Description, Tags (Auto Generated)
// TODO 

// Middleware
async function getAuthor(req,res,next){
  let Author;
  try{
    Author = await authorschema.findById(req.params.id);
    if(Author == null){
      return res.status(404).json({message: "No Author With Given ID"});
    }
  } catch (err){
    return res.status(500).json({message: err.message});
  }

  res.Author = Author;
  next();

}

// Get All
router.get("/",async(req,res)=>{
  try{
    const authors = await authorschema.find();
    res.json(authors);
  }catch(err){
    return res.status(500).json({message: err.message});
  }
})

// Get One
router.get("/:id",getAuthor,(req,res)=>{
  res.json(res.Author);
})

// Get author's blogs
router.get("/:id/blogs",getAuthor,async(req,res)=>{
  Blogs = await blog.find({author: res.Author.name});
  res.json(Blogs);
})

// Post
router.post("/",async(req,res)=>{
  const Author = new authorschema({
    name: req.body.name,
    photo: req.body.photo,
    desc: req.body.desc,
  })
  try{
    const newAuthor = await Author.save();
    res.status(201).send(newAuthor);
  } catch (err){
    res.status(400).json({message: err.message});
  }
})


// Patch
router.patch("/:id",getAuthor,async(req,res)=>{
  if(req.body.name != null){
    res.Author.name = req.body.name;
  }

  if(req.body.photo != null){
    res.Author.photo = req.body.photo;
  }

  if(req.body.desc != null){
    res.Author.desc = req.body.desc;
  }

  if(req.body.tags != null){
    res.Author.tags = req.body.desc;
  }

  try{
    const newAuthor = await res.Author.save();
    res.json(newAuthor);
  }catch(err){
    res.status(500).json({message: err.message});
  }
})

// Delete
router.delete("/:id",getAuthor,async(req,res)=>{
  try{
    await res.Author.remove();
    res.json({message: "Removed Successfully"});
  }catch(err){
    res.status(500).json({message: err.message});
  }
})

module.exports = router