var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    mongoose = require('mongoose'),
    MongoClient = require('mongodb').MongoClient,
    router = require('./observation-router.js'),
    models = require('./models.js'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static')

    server.listen(process.env.PORT || 3000)

//app.use(serveStatic(__dirname + "/dist"));
app.use(express.static(__dirname + '/'))
app.use(cors())
app.use(express.json())

// Set up the mongoose module.
var mURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/weatherDB' // check whether we have env variables or not and act accordingly.
mongoose.Promise = global.Promise
mongoose.connect(mURI, function (error) {
    if (error) console.log('error')
    else console.log('mongo succeeded')
})

app.use('/', router.router)

// Seeding data.
/*
let temp = (Math.random() * 40) - 20
let observation = new models.Observation({ location: 'Dubai', temperature: temp, timeZone: 4 })
observation.save().then(() => {
}).catch((err) => {
    
})
temp = (Math.random() * 40) - 20
 observation = new models.Observation({ location: 'New York', temperature: temp, timeZone: 4 })
observation.save().then(() => {
}).catch((err) => {
    
})
temp = (Math.random() * 40) - 20
 observation = new models.Observation({ location: 'Tokyo', temperature: temp, timeZone: 4 })
observation.save().then(() => {
}).catch((err) => {
    
})
temp = (Math.random() * 40) - 20
 observation = new models.Observation({ location: 'Dubai', temperature: temp, timeZone: 4 })
observation.save().then(() => {
}).catch((err) => {
    
})
temp = (Math.random() * 40) - 20
 observation = new models.Observation({ location: 'Amsterdam', temperature: temp, timeZone: 4 })
observation.save().then(() => {
}).catch((err) => {
    
})
temp = (Math.random() * 40) - 20
 observation = new models.Observation({ location: 'Helsinki', temperature: temp, timeZone: 4 })
observation.save().then(() => {
}).catch((err) => {


})*/
/*
let observation = new models.Locations({ name: 'Tokyo', lat: '35.6584421',lon: '139.7328635'})
observation.save().then(() => {
}).catch((err) => {
    
})
 observation = new models.Locations({ name: 'Helsinki', lat: '60.1697530',lon: '24.9490830' , })
observation.save().then(() => {
}).catch((err) => {
    
})
 observation = new models.Locations({ name: 'New York', lat: '40.7406905', lon: '-73.9938438' })
observation.save().then(() => {
}).catch((err) => {
    
})
 observation = new models.Locations({ name: 'Dubai', lat: '25.092535', lon: '55.156224' })
observation.save().then(() => {
}).catch((err) => {
    
})
 observation = new models.Locations({ name: 'Amsterdam', lat: '52.3650691', lon: '4.9040238' })
observation.save().then(() => {
}).catch((err) => {
    
})*/
