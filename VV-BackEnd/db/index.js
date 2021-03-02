const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://admin:changeme@landdetails.dzrol.mongodb.net/VivasayamDB', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db