import mongoose from "mongoose"

// shorthand
const Schema = mongoose.Schema

// where models are created and their data types are specified
const resourceSchema = new Schema({
  text: String,
  favorite: Boolean,
})

const Resource = mongoose.model('Skill', resourceSchema)

export {
  Resource
}