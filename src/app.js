const path = require('path')
const express = require('express')
const pollutedCities = require ('./utilis/cities')
const wikIDescription = require('./utilis/description')

const app = express()
const port = process.env.PORT

const publicDirectoryPath =  path.join(__dirname, '../public')

app.use(express.json())

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.send ('./public/index')
})


app.get ('/cities', (req, res) => {
    if (!req.query.country){
        return res.send ({ 
            error: 'You must provide country!'
        })
    }

    pollutedCities(req.query.country, (error, data) => {
        if (error) {
            console.log(error)
            return res.send ({ error })
        }
        const cities = []
        const numberOfCities = data.length
        data.forEach((data) => {
            wikIDescription(data.name, function (error, wikiData)  {
                if (error) {
                    res.send ({ error })
                }
                const object = {}
                object.name = data.name
                object.description = wikiData.extract
                cities.push(object)
                if (cities.length === numberOfCities){
                    res.send(cities)
                }
            })
        })
    })
})


app.listen(port, ()=> {
    console.log('Server is up on port: ' + port)
})