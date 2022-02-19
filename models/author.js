
/**
 * The author schema for the database.
 * @param name - The name of the author.
 * @param photo - The photo url of the author.
 * @param desc - The description of the author.
 * @param tags - The tags of the author's posts.
 * @returns None
 */
class authorSchema {
  constructor(name, photo, desc, tags){
    this.name = name;
    this.photo = photo;
    this.desc = desc;
    this.tags = tags;
  }
}

module.exports = authorSchema