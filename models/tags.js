
/**
 * A mongoose schema for the blog tags model.
 * @param title - The title of the tag.
 * @returns None
 */
const blogSchema = {
  title: {
    type: String,
    required: true
  }
}


module.exports = blogSchema
