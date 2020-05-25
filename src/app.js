const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Help yourself nigga',
        name: 'Andrew Mead'
    })
})


app.get('/weather', (req, res) => {
    // if (!req.query.address) {
    //     return res.send({
    //         error: 'You must provide a search term'
    //     })
    // }
    // console.log(req.query)
    // res.send({
    //     address: req.query.address
    // })
    if (!req.query.address){
        res.send({
            error: 'Please type a location'
        })
    } else
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send(error)
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return console.log(error)
                }
    
                res.send({
                    location: location,
                    forecast: forecastData
                })
            })
        })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        message:'Help article not found',
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        message:'Page not found',
        name: 'Andrew Mead'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})