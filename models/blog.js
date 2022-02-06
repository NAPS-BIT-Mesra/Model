const mongoose = require("mongoose")
/** 
 * req. data->
 * Data -> Title, Author, Created, Tags, Created, Likes, Thubnail, Content, Category (Media Report, Site Report, Editorial)
*/
const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  tags: {
    type: Array,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
})


module.exports = mongoose.model('naps_blog', blogSchema)
