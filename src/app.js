const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
const partialsPath = path.join(__dirname, '../views/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brian Jones'
    })
});

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About me',
        name: 'Brian Jones'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help Message',
        title: 'Help',
        name: 'Brian Jones'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (errorData, resp) => {
            if (errorData) {
                return res.send({
                    error: errorData
                })
            }

            res.send({
                forecast: resp.summary,
                location,
                address: req.query.address
            });
        })
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Brian Jones',
        message: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Brian Jones',
        message: 'Page not found.'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});

