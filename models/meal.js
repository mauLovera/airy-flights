import mongoose from "mongoose"

// shorthand
const Schema = mongoose.Schema

// where models are created and their data types are specified

const mealSchema = new Schema({
  name: {
    type: String,
    unique: true,
  }
})

const Meal = mongoose.model('Meal', mealSchema)

export {
  Meal
}