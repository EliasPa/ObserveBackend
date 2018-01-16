const express = require('express'),
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});
app.use(express.static(__dirname + '/'))
app.use(express.json())

// Set up the mongoose module.
const mURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/weatherDB' // check whether we have env variables or not and act accordingly.
mongoose.Promise = global.Promise
mongoose.connect(mURI, (error) => {
    if (error) console.log('error connecting to database')
    else console.log('mongo succeeded')
})

app.use('/', router.router)