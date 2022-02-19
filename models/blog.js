/**
 * A Mongoose schema for a blog post.
 * @param title - The title of the blog post.
 * @param author - The author of the blog post.
 * @param content - The content of the blog post.
 * @param category - The category of the blog post. Belongs to -{
 * * Media Report
 * * Site Report
 * * Editorial
 * }
 * @param createdAt - The time of blog post
 * @param tags - The tags of the blog post
 * @param thumbnail - The url of the thumbnail for the blog post
 * @param likes - The number of likes for the blog post
 * @returns None
 */
class blogSchema {
  constructor (title,author,tags,thumbnail,content,category){
    this.title = title;
    this.author = author;
    this.tags = tags;
    this.thumbnail = thumbnail;
    this.content = content;
    this.category=category;
    this.likes = 0;
    this.createdAt= Date.now();
  }
}


module.exports = blogSchema
