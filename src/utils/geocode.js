const request = require('request');


const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiYnJpYW5mam9uZXMiLCJhIjoiY2p4eHpjbTU1MDUxYjNibnpleTY4ZHl2YiJ9.FmzbDL8wQC82gkvZp5V2oQ&`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });

};


module.exports = geocode;
