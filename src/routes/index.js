const express = require('express')
const router = express.Router()
const test = require('./test')
const scb = require('./scb')
const user = require('./user')

router.use(test)
router.use(scb)
router.use(user)

module.exports = router
