import mongoose from "mongoose"

// shorthand
const Schema = mongoose.Schema

// where models are created and their data types are specified
const flightSchema = new Schema({
  text: String,
  favorite: Boolean,
})

const Flight = mongoose.model('Skill', flightSchema)

export {
  Flight
}