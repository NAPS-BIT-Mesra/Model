const express = require("express")
const router = express.Router()
const blog = require("../models/blog")
const author = require("../models/author")
const db = require("../server").get().db("naps_blog")

/**
 * A middleware function that takes in a request and response object and returns a Blog object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function to call.
 * @returns None
 */
async function getBlog(req,res,next){
  let Blog;
  try{
    Blog = await blog.findById(req.params.id);
    if(Blog == null){
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
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns None
 */
async function getAuthor(req,res,next){
  let Blog;
  try{
    Author = await author.findById(req.body.author);
    if(Author == null){
      return res.status(404).json({message: `No Author with the given id ${req.body.author}}`})
    }
  } catch (err){
    return res.status(500).json({message: err.message})
  }

  res.Author = Author;
  next();
}
// Get All
router.get("/",async(req,res)=>{
  try{
    const blogs = await db.collection("naps_blogs").find({}).toArray();
    res.json(blogs)
  }catch (err){
    res.status(500).json({ message: err.message })
  }
})

/**
 * A function that returns a JSON object containing the blog data.
 */
router.get("/id/:id",getBlog, (req,res)=>{
  res.json(res.Blog);
})

/**
 * Takes in a new blog and adds it to the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns None
 */
router.post("/",getAuthor,async(req,res)=>{
  const Blog = new blog({
    title: req.body.title,
    author: req.body.author,
    tags: req.body.tags,
    likes: 0,
    thumbnail: req.body.thumbnail,
    content: req.body.content,
    category: req.body.category
  })
  try{
    const newBlog = await Blog.save()
    req.body.tags.forEach(tag=>{
      if(res.Author.tags.find((t)=>{
        return t==tag;
      })){
        // Tag exists
      }else{
        res.Author.tags.push(tag);
      }
    })
    res.Author.save();
    res.status(201).send(newBlog);
  }catch (err) {
    res.status(400).json({message: err.message})
  }
})

/**
 * Removes all blog posts from the database.
 * @param req - The request object.
 * @param res - The response object.
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
 * @param req - The request object. 
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
 * @param req - The request object.
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
