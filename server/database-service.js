let mongoose = require('mongoose')
const models = require('./models.js')
const locations = require('./locations.js').locations

function saveTemperature(data, callback) {
    if (checkInputValidity(data)) {
        let observation = new models.Observation({ location: data.location, temperature: parseFloat(data.temperature) })
        observation.save().then(() => {
            callback({ message: 'ok', code: 200 })
        }).catch((err) => {
            if (err.response && err.response.code === 500) {
                callback({ error: 'Internal server error.', code: 500 })
            } else {
                callback({ error: 'Unhandled error.', code: err.response.code })
            }
        })
    }
}



function getTemperature(data, callback) {
    models.Observation.aggregate({
        $group: {
            _id: '',
            max: {
                $max: '$temperature',
            },
            min: {
                $min: '$temperature'
            }
        }
    }, function (err, docs) {
        callback({ max: docs.max, min: docs.min })
    });
}

function getDateDayAgo() {
    let day_ago = new Date().getTime() - 24 * 3600000
    return new Date(day_ago)
}

function getMaxAndMin(callback) {
    models.Observation.aggregate([{ $match: { date: { $gt: getDateDayAgo() } } },
    {
        $group: {
            _id: '$location',
            max: { $max: '$temperature' },
            min: { $min: '$temperature' }
        }
    },
    { $sort: { max: -1 } }
    ], function (err, result) {
        if (err) {
            callback({ error: 'Internal error', code: 500 })
        } else {
            let data = new Map()
            let containedLocations = []
            for (let i = 0; i < result.length; i++) {
                const el = result[i];
                let json = {
                    max: el.max,
                    min: el.min
                }
                data.set(el._id, json)
            }
            if (data.length === 0) {
                callback({ code: 201 })
            } else {
                callback({ criticalPoints: data, code: 200 })
            }
        }
    })
}

function getTemps(callback) {
    models.Observation.aggregate([{ $group: { _id: '$location', temp: { $last: '$temperature' } } }],
        function (err, result) {
            if (err) {
                callback({ error: 'Internal error', code: 500 })
            } else {
                let data = new Map()
                let containedLocations = []
                for (let i = 0; i < result.length; i++) {
                    const el = result[i]
                    data.set(el._id, el.temp)

                }
                if (data.length === 0) {
                    callback({ code: 201 })
                } else {
                    getMaxAndMin((response) => {
                        let criticalPoints = response.criticalPoints
                        parseFinalData(criticalPoints, data, (final_data) => {
                            callback({ weatherData: final_data, code: response.code })
                        })
                    })
                }
            }
        })
}

function parseFinalData(criticalPoints, data, callback) {
    getLocations((response) => {
        let locations = response.locations
        let final_data = []

        for (let i = 0; i < locations.length; i++) {
            const location = locations[i]
            let cp = { max: '-', min: '-' }
            let temp = '-'

            if (criticalPoints.has(location)){
                cp = criticalPoints.get(location)
            }
            if (data.has(location)){
                temp = data.get(location)
            }
            let row = {
                location: location,
                temperature: temp,
                max: cp.max,
                min: cp.min
            }

            final_data.push(row)
        }
        callback(final_data)
    })
}

function getHottestAndColdest(callback) {
    models.Observation.aggregate([{ $match: { date: { $gt: getDateDayAgo() } } }, // limit to 24h
    {
        $group: {
            _id: '$location',
            last: { $last: '$temperature' }
        }
    },
    {
        $sort: { last: -1 }
    }
    ], function (err, result) {
        if (err) {
            throw err
        } else {
            let data = []
            for (let i = 0; i < result.length; i++) {
                const el = result[i];
                let json = {
                    location: el._id,
                    temperature: el.last
                }
                data.push(json)
            }

            if (data.length === 0) {
                callback({ code: 201 })
            } else {
                callback({
                    code: 200,
                    max: {
                        temp: data[0].temperature,
                        location: data[0].location
                    },
                    min: {
                        temp: data[data.length - 1].temperature,
                        location: data[data.length - 1].location
                    }
                })
            }
        }
    })
}

function getCoordinates(callback) {
    models.Locations.find({}, function (err, docs) {
        if (err) {
            callback({ error: 'Internal error', code: 500 })
        } else {
            let data = []
            for (let i = 0; i < docs.length; i++) {
                const el = docs[i];
                let coord = [el.lat, el.lon]
                data.push(coord)
            }
            callback({ coordinates: data, code: 200 })
        }
    })
}

function getLocations(callback) {
    models.Locations.find({}, function (err, docs) {
        if (err) {
            callback({ error: 'Internal error', code: 500 })
        } else {
            let data = []
            for (let i = 0; i < docs.length; i++) {
                const el = docs[i];
                let location = el.name
                data.push(location)
            }
            callback({ locations: data, code: 200 })
        }
    })
}

function getLocationCoordinates(data, callback) {
    models.Locations.findOne({ name: data.name }, function (err, doc) {
        if (err) {
            callback({ error: 'Internal error', code: 500 })
        } else {
            callback({ coordinates: [doc.lat, doc.lon], code: 200 })
        }
    })
}

function checkInputValidity(data) {
    const location = data.location
    const temperature = data.temperature
    if (location.length === 0 || isNaN(temperature) || temperature === '') {
        return false
    }
    return true
}

module.exports = {
    saveTemperature,
    getTemperature,
    getTemps,
    getMaxAndMin,
    getCoordinates,
    getLocationCoordinates,
    getLocations,
    getHottestAndColdest
}