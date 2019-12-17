const request = require ('supertest')
const app = require ('../src/app')

const pollutedCities = require ('../src/utilis/cities')
const wikIDescription = require ('../src/utilis/description')

test ('Should return 10 cities from selected cutry',  () => {

    pollutedCities('Poland', (error, body) => {
        expect(body.length).toBe(10)
    })

})

test ('Should return city description', () => {
    wikIDescription ('Gliwice', (error, body) => {
        expect(body.extract).not.toBeNull()

    })
})

test ('Should not return 10 cities from selected cutry',  () => {

    pollutedCities('Czech', (error, body) => {
        expect(error).not.toBe(10)
    })

})