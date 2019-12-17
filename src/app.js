const path = require('path')
const express = require('express')
const citiesRouter = require('./router/cities')
const cors = require('cors')


const app = express()

const publicDirectoryPath =  path.join(__dirname, '../public')

app.use(cors)
app.use(express.json())
app.use(citiesRouter)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.send ('./public/index')
})

module.exports = app