const express = require("express");
const router = express.Router()
const authorschema = require("../models/author")
const blog = require("../models/blog")
// Data -> Name, Photo, Description, Tags (Auto Generated)
// TODO 

/**
 * A middleware function that takes in a request and response object and returns a promise that resolves to the author with the given ID.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function to call.
 * @returns None
 */
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

/**
 * Returns a list of all authors in the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns None
 */
router.get("/",async(req,res)=>{
  try{
    const authors = await authorschema.find();
    res.json(authors);
  }catch(err){
    return res.status(500).json({message: err.message});
  }
})

/**
 * A simple function that returns the author of the project.
 * @param req - the request object.
 * @param res - the response object.
 * @returns None
 */
router.get("/id/:id",getAuthor,(req,res)=>{
  res.json(res.Author);
})

/**
 * Returns the blog with the given id.
 * @param req - The request object.
 * @param res - The response object.
 * @returns None
 */
router.get("/id/:id/blogs",async(req,res)=>{
  Blogs = await blog.findById(req.params.id);
  res.json(Blogs);
})

/**
 * Takes in a request and response object and creates a new author.
 * @param req - The request object.
 * @param res - The response object.
 * @returns None
 */
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


/**
 * Update the author with the given ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns None
 */
router.patch("/id/:id",getAuthor,async(req,res)=>{
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

/**
 * Removes the Author from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns None
 */
router.delete("/id/:id",getAuthor,async(req,res)=>{
  try{
    await res.Author.remove();
    res.json({message: "Removed Successfully"});
  }catch(err){
    res.status(500).json({message: err.message});
  }
})

/**
 * Returns a list of authors that have the given tags.
 * @param req - The request object.
 * @param res - The response object.
 * @returns None
 */
router.get("/tag", async(req,res)=>{
  try{
    const Authors = await authorschema.find({tags:req.body.tags});
    res.json(Authors);
  }catch(err){
    res.status(500).json({message: err.message});
  }
})



module.exports = router