function checkInputValidity(data, callback) {
    let location = data.location
    let temperature = data.temperature
    getLocations((response) => {
        let locations = response.locations
        if (
            locations.indexOf(location) === -1
            || location === ''
            || isNaN(temperature)
            || temperature === ''
            || temperature == null
            || temperature > 200
            || temperature < -200
        ) {
            callback({ success: false, message: 'Input data not valid.' })
        } else {
            callback({ success: true })
        }
    })
}

function getDateDayAgo() {
    let day_ago = new Date().getTime() - 24 * 3600000
    return new Date(day_ago)
}
function parseFinalData(criticalPoints, data, locations, callback) {
    let final_data = []
    for (let i = 0; i < locations.length; i++) {
        let location = locations[i]
        let cp = { max: '-', min: '-' }
        let temp = '-'

        if (criticalPoints.has(location)) 
            cp = criticalPoints.get(location)
        
        if (data.has(location)) 
            temp = data.get(location)
        
        let row = {
            location: location,
            temperature: temp,
            max: cp.max,
            min: cp.min
        }
        
        final_data.push(row)
    }
    callback(final_data)
}

module.exports = {
    checkInputValidity,
    getDateDayAgo,
    parseFinalData
}