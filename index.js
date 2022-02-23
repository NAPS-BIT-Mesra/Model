// Imports
const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")

// Initialisation
const app = express();
app.use(express.json())
const port = process.env.PORT;
const dburl = process.env.DBURL;
mongoose.connect(dburl);
db = mongoose.connection;

db.on("error",(error)=>{
  console.error(error);
})

db.once("open",()=>{
  console.log(`Connected to DB @ ${dburl}`)
})

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