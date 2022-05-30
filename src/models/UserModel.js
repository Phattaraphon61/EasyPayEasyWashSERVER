const mongoose = require('mongoose')
const constants = require('../configs/constants')
const UserSchema = new mongoose.Schema(
    {
        userid: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        balance: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        },
        bank: {
            type: Object,
            default: []
        }
    }
)

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel