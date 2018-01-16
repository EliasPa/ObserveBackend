let mongoose = require('mongoose')

let oservationSchema = mongoose.Schema({
    location: String,
    temperature: Number,
    date: { type: Date, default: Date.now}
});

let Observation = mongoose.model('Observation', oservationSchema)

let locationSchema = mongoose.Schema({
    name: String,
    lat: String,
    lon: String
});

let Locations = mongoose.model('Location', locationSchema)

module.exports = {
    Observation,
    Locations
}