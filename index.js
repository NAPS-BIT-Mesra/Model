// Imports
const express = require("express");
const server = require("./server")
const {MongoClient} = require("mongodb")
const app = express();

const dburl = process.env.DBURL;
const port = process.env.PORT;

app.use(express.json())

MongoClient.connect(dburl, function(err,database){
  if(err){
    throw err;
  }
  // set a global variable in the server.js file to use this database object anywhere
  server.set(database);

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

})



