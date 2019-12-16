const request = require('request')

const wikIDescription = (city, callback) => {

    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=&exintro=&format=json&redirects=1&titles=`+encodeURIComponent(city)
    const json = true

    request ({url, json}, (error, {body}) => {
        if (error){
            callback ('Unable to connect to MediaWiki API', undefined)
        } else if (body.query.pages[Object.keys(body.query.pages)] < 0) {
            callback ('Unable to find information.', undefined)
        } else {
            callback(undefined, body.query.pages[Object.keys(body.query.pages)])
        }
    })
}

module.exports = wikIDescription