let router = require('express').Router()
const service = require('./database-service.js')

/*
    Purpose: used for getting temperature data,
    Method: GET,
    Returns:
        Succesful: {
            weatherData: {}, // The requested data
            code: 200
        },
        Erroneous: {
            error: 'Internal error',
            code: 500
        }
*/
router.get('/temperatures', function (req, res) {
    service.getTemps((response) => {
        res.send(response)
    })
})

/*
    Purpose: used for getting the currently hottest and coldest locations,
    Method: GET,
    Returns:
        Succesful: {
                max: {
                    temp: data[0].temperature,
                    location: data[0].location
                },
                min: {
                    temp: data[data.length - 1].temperature,
                    location: data[data.length - 1].location
                },
                code: 200
        },
        Erroneous: {
            error: 'Internal error',
            code: 500
        }
*/
router.get('/location', function (req, res) {
    service.getHottestAndColdest((response) => {
        res.send(response)
    })
})

/*
    Purpose: used for getting all locations (Observation points),
    Method: GET,
    Returns:
        Succesful: {
            coordinates: [], // The requested coordinates
            code: 200
        },
        Erroneous: {
            error: 'Internal error',
            code: 500
        }
*/
router.get('/coordinates', function (req, res) {
    service.getCoordinates((response) => {
        res.send(response)
    })
})

/*
    Purpose: used for getting all locations,
    Method: GET,
    Returns:
        Succesful: {
            locations: [], // Names of locations
            code: 200
        },
        Erroneous: {
            error: 'Internal error',
            code: 500
        }
*/
router.get('/locations', function (req, res) {
    service.getLocations((response) => {
        res.send(response)
    })
})

/*
    Purpose: used for getting coordinates for a specified location,
    Method: POST,
    Returns:
    Succesful: {
        coordinates: [],
        code: 200
    },
    Erroneous: {
        error: 'Internal error',
        code: 500
    }
*/
router.post('/locationCoordinates', function (req, res) {
    service.getLocationCoordinates(req.body, (response) => {
        res.send(response)
    })
})

/* 
    Purpose: used for saving temperature data.
    The sent data will be checked for its validity and then
    it will be stored in the MongoDB database,
    Method: POST,
    Returns:
        Succesful: {
            message: 'OK',
            code: 200
        },
        Erroneous: {
            error: 'Internal error',
            code: 500
        }
*/
router.post('/', function (req, res) {
    service.saveTemperature(req.body, (response) => {
        console.log(response)
        res.json(response)
    })
})

// Just export the router.
module.exports = {
    router
}
