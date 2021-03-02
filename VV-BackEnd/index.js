const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const DetailsRouter = require('./routes/rentNhire-router')

const app = express()
const apiPort = 3003

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Connected!')
})

app.use('/api', DetailsRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))