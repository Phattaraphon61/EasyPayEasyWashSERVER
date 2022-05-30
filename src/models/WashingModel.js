const mongoose = require('mongoose')
const constants = require('../configs/constants')
const Schema  = require('mongoose')

const WashingSchema = new mongoose.Schema(
    {
        washingid: {
            type: String,
            require: true
        },
        userid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        detail: {
            type: String,
            default: "-"
        },
        price: {
            type: String,
            default: "20"
        }
    }
)

const WashingModel = mongoose.model('Washing', WashingSchema)

module.exports = WashingModel