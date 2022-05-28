const express = require('express')
const test = require('./test')
const scb = require('./scb')
const router = express.Router()

router.use(test)
router.use(scb)

module.exports = router
