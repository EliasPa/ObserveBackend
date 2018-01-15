var mongoose = require('mongoose')

var oservationSchema = mongoose.Schema({
    location: String,
    timeZone: Number,
    temperature: Number,
    date: { type: Date, default: Date.now}
});

var Observation = mongoose.model('Observation', oservationSchema)

var locationSchema = mongoose.Schema({
    name: String,
    lat: String,
    lon: String
});

var Locations = mongoose.model('Location', locationSchema)

module.exports = {
    Observation,
    Locations
}