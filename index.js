// Imports
const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const {MongoClient} = require("mongodb")

// Initialisation
const app = express();
app.use(express.json())
const port = process.env.PORT;
const dburl = process.env.DBURL;


// Routes
const blogRoute = require("./routes/blog");
app.use("/blog",blogRoute)
const authorRoute = require("./routes/author");
app.use("/author",authorRoute)
const tagsRoute = require("./routes/tags");
app.use("/tag",tagsRoute);

app.listen(port,()=>{
  console.log(`Listening on ${port}`);
})