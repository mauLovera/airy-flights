import {Flight} from "../models/flight.js"


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

export {
  index,
  newFlight as new,
}