const express = require("express")
const router = express.Router()
const blog = require("../models/blog")
const author = require("../models/author")
const {ObjectId} = require("mongodb")
const { tags } = require("../models/author")
const db = require("../server").get().db("naps_blog")

/**
 * A middleware function that takes in a request and response object and returns a Blog object.
 * @param next - The next middleware function to call.
 * @returns None
 */
async function getBlog(req,res,next){
  let Blog;
  try{
    Blog = await db.collection("naps_blogs").find({_id: ObjectId(req.params.id)}).toArray();
    if(Blog.length === 0){
      return res.status(404).json({message: `No Blog with the id ${req.params.id}`})
    }
  } catch (err){
    return res.status(500).json({message: err.message})
  }

  res.Blog = Blog;
  next();
}
/**
 * Finds the author with the given id and stores it in the request object.
 * @param next - The next middleware function.
 * @returns None
 */
async function getAuthor(req,res,next){
  let Blog;
  try{
    Author = await db.collection("naps_authors").find({_id: ObjectId(req.body.author)}).toArray();
    if(Author.length === 0){
      return res.status(404).json({message: `No Author with the given id ${req.body.author}}`})
    }
  } catch (err){
    return res.status(500).json({message: err.message})
  }

  res.Author = Author[0];
  next();
}
/**
 * Returns a list of all blogs in the database.
 * @returns A list of all blogs in the database.
 */
router.get("/",async(req,res)=>{
  try{
    const blogs = await db.collection("naps_blogs").find({}).toArray();
    res.json(blogs)
  }catch (err){
    res.status(500).json({ message: err.message })
  }
})

/**
 * Takes in a new blog and adds it to the database and also updates the authors tags in the naps_authors database
 * @param res.Author - The author who is posting the request
 * @returns None
 */
router.post("/",getAuthor,async(req,res)=>{
  const Blog = new blog(
    req.body.title,
    req.body.author,
    req.body.tags,
    req.body.thumbnail,
    req.body.content,
    req.body.category
  )
  try{
    const result = await db.collection("naps_blogs").insertOne(Blog);
    const tagstoadd = []
    req.body.tags.forEach(tag=>{
      if(res.Author.tags.find((t)=>{
        return t==tag;
      })){
      // do nothing
      }else{
        console.log(tag);
        tagstoadd.push(tag)
      }
    })
    if(tagstoadd.length>0){
      await db.collection("naps_authors").updateOne({_id: res.Author._id},{$set: {"tags": [...res.Author.tags,...tagstoadd]}});
    }
    res.status(201).json({message: `Inserted blog with id ${result.insertedId}`})
  }catch (err) {
    res.status(400).json({message: err.message})
  }
})

/**
 * A function that returns a JSON object containing the blog data of the user whose id is provided.
 * @param res.Blog - The blog object added by getBlog middleware
 */
router.get("/id/:id",getBlog, (req,res)=>{
  res.json(res.Blog);
})

/**
 * Removes the blog post with given id from the database.
 * @param res.Blog - The blog object added by getBlog middleware
 * @returns None
 */
router.delete("/id/:id",  getBlog, async(req,res)=>{ 
  try{
    await res.Blog.remove();
    res.json({message: "Removed Succesfully"})
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

/**
 * Update a blog post with the given ID. 
 * @param res - The response object. 
 * @returns None.
 */
router.patch("/id/:id",getBlog,async(req,res)=>{
  if(req.body.title != null){
    res.Blog.title = req.body.title;
  }

  if(req.body.author != null){
    res.Blog.author = req.body.author;
  }

  if(req.body.tags != null){
    res.Blog.tags = req.body.tags;
  }

  if(req.body.thumbnail != null){
    res.Blog.thumbnail = req.body.thumbnail;
  }
  
  if(req.body.content != null){
    res.Blog.content = req.body.content;
  }
  if(req.body.category != null){
    res.Blog.category = req.Blog.catergory;
  }
  try{
    const newBlog = await res.Blog.save();
    res.json(newBlog);
  }catch(err){
    res.status(500).json({message: err.message});
  }
})

/**
 * Finds all blogs with the given tags.
 * @param res - The response object.
 * @returns None
 */
router.get("/tag", async(req,res)=>{
  try{
    const Blogs = blog.find({tags: req.body.tags});
    res.json(Blogs);
  }catch(err){
    res.status(500).json({message: err.message});
  }
})


module.exports = router
