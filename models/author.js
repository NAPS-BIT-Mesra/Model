const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false,
    default: []
  }
})

module.exports = mongoose.model('naps_author',authorSchema)