const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Land_details = new Schema(
    {
        location: { type: String, required: true },
        size: { type: String, required: true },
        products: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('land-details', Land_details)