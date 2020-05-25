const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2a5f7dc6edaaad6fa29a6e348844f5ff&query='+long+','+lat
    request({ url, json:true }, (error, { body }) => {
        if(error){
            callback('unable to request weather', undefined)
        } else if (body.error){
            callback('Unable to specify location', undefined)
        } else if (body.location.error){
            callback("no matching results")
        } else
            callback(undefined, "It is currently "+body.current.weather_descriptions+". "+body.current.temperature+" degrees out. The humidity level is "+body.current.humidity)
    })
}

module.exports = forecast
