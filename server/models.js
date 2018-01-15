const mongoose = require('mongoose')

const oservationSchema = mongoose.Schema({
    location: String,
    timeZone: Number,
    temperature: Number,
    date: { type: Date, default: Date.now}
});

const Observation = mongoose.model('Observation', oservationSchema)

const locationSchema = mongoose.Schema({
    name: String,
    lat: String,
    lon: String
});

const Locations = mongoose.model('Location', locationSchema)

module.exports = {
    Observation,
    Locations
}