import {Flight} from "../models/flight.js"
import { Meal } from "../models/meal.js"


// display all the flights
function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights', {
      flights,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

// display a forum for a new flight
function newFlight(req, res) {
  Flight.find({})
  .then(flight => {
    res.render('flights/new', {
      flight
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
  Flight.create(req.body)
  .then(flight => {
    console.log('Created Flight: ', flight)
    console.log('------------------------')
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

// find the flight by its id and delete it from database
function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

// render a view that shows the flight details page
function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meal')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meal}})
    .then(meals => {
      res.render(`flights/show`, {
        flight,
        meals,
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

// render a view that has a forum to allow editing of the flight data
function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render(`flights/edit`, {
      flight,
      tickets: flight.ticket,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

// update is similar to the create function but it replaces the value instaed of creating it
function update(req, res) {
  console.log("----------------------")
  console.log("Data Before: ", req.body)
  console.log("----------------------")
  for (let key in req.body) {
    if (!req.body[key]) delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    console.log('Created Flight: ', flight)
    console.log('------------------------')
    flight.tickets.shift()
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update, 
}