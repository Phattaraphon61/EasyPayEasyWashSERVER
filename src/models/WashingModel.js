const mongoose = require('mongoose')
const constants = require('../configs/constants')

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
            require: true
        },
        price: {
            type: String,
            require: true
        }
    }
)

const WashingModel = mongoose.model('Washing', WashingSchema)

module.exports = WashingModel