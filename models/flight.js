import mongoose from "mongoose"
import { Meal } from "./meal.js"

// shorthand
const Schema = mongoose.Schema

// where models are created and their data types are specified

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
    default: 'A9',
  },
  price: {
    type: Number,
    min: 0,
    default: 100,
  },
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    default: 'American',
  },
  airportDep: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
  },
  airportArr: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'LAX',
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    default: 10,
  },
  departTime: {
    type: Date,
    default: function() {
      const today = new Date()
      const oneYearFromNow = today.getFullYear() + 1
      return today.setFullYear(oneYearFromNow)
    },
  },
  tickets: [ticketSchema],
  meal: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
})

const Flight = mongoose.model('Skill', flightSchema)
// Realised I didnt change the skill but wasn't sure if that would break the data

export {
  Flight
}