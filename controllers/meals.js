import { Meal } from '../models/meal.js'
import { Flight } from "../models/flight.js"

function newMeal(req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      meals
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

// create a new flight and add to the database
function create(req, res) {
  console.log("----------------------")
  console.log("Data Before: ", req.body)
  console.log("----------------------")
  // delete input if left blank and replace with default in schema 
  for (let key in req.body) {
    if (!req.body[key]) delete req.body[key]
  }
  // create the data from req.body
  Meal.create(req.body)
  .then(meal => {
    console.log('Created meals: ', meal)
    console.log('------------------------')
    res.redirect('/meals/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToList(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meal.push(req.body.mealId)
    flight.save()
		.then(() => {
	    res.redirect(`flights/${flight._id}`)
		})
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}



export {
  newMeal as new,
  create,
  addToList,
}