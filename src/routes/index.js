const express = require('express')
const router = express.Router()
const test = require('./test')
const scb = require('./scb')
const user = require('./user')
const washing = require('./washing')
router.use(test)
router.use(scb)
router.use(user)
router.use(washing)

module.exports = router
