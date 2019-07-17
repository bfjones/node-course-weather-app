const request = require('request');


const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/a88e299a93ebfcf1509074903ab696a5/${latitude},${longitude}`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.')
        } else if (body.error) {
            callback('Unable to find location. Please try another.')
        } else {
            const temp = body.currently.temperature;
            const rain = body.currently.precipProbability;
            const visibility = body.currently.visibility;
            callback(undefined, {
                temperature: temp,
                precip: rain,
                summary: `${body.daily.summary} It is currently ${temp} degrees. There is ${rain}% chance of rain with a visibility of ${visibility} miles.`
            })
        }
    })
};

module.exports = forecast;
