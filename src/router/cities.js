const express = require ('express')
const router = new express.Router()

const pollutedCities = require ('../utilis/cities')
const wikIDescription = require('../utilis/description')



router.get ('/cities', async (req, res) => {
    
    try {
    
        if (!req.query.country){
            return res.status(400).send ({ 
                error: 'You must provide country!'
            })
        }
    
        pollutedCities(req.query.country, (error, data) => {
            if (error) {
                return res.status(400).send ({ error })
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
    } catch (e) {
        res.status(500).send()
    }

})


module.exports = router