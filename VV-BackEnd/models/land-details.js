const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Land_details = new Schema(
    {
        Place: { type: String, required: true },
        Address:{ type:String, required: true},
        Products:{ type:[String], required: true},
        Price:{ type:String, required: true},
        Size: { type: String, required: true },
        Features: { type: [String], required: true },
        TotalBudget:{ type:String, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('land-details', Land_details)