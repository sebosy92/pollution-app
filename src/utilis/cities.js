const request = require('request')

const pollutedCities = (country, callback) => {

    const allowedCountries = ['poland', 'germany', 'spain', 'france']
    const isAllowed = allowedCountries.includes(country.toLowerCase())
    const countryIndex = allowedCountries.indexOf(country.toLowerCase())
    const countrShortcut = ['PL', 'DE', 'ES', 'FR']

    if (!isAllowed) {
        callback ('This country is out of our services. Please use another country.', undefined)
        return
    }
   
    const url = `https://api.openaq.org/v1/cities?country=${countrShortcut[countryIndex]}&sort=desc&order_by=count&limit=10`
    const json = true



    request ({url, json}, (error, {body}) => {
        if (error){
            callback ('Unable to connect to Open AQ Platform API', undefined)
        } else if (body.results.length === 0){
            callback ('Unable to find country. Try another search.', undefined)
        } else {
            callback (undefined, body.results)
        }
    })

}

module.exports = pollutedCities



