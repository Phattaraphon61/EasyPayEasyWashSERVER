const express = require('express')
const router = express.Router()
var mqttHandler = require('../../mqtt');
import constants from '../../configs/constants'
const mqtt = constants.MQTT

var mqttClient = new mqttHandler(mqtt);


router.post('/', async (request, response) => {
    let { transactionId, billPaymentRef1 } = request.body
    mqttClient.sendMessage(billPaymentRef1, 'op,1');

    // res.status(200).send("scb");
    response.status(200).json({
        "resCode": "00",
        "resDesc ": "success",
        "transactionId": transactionId,
        // "confirmId" : "xxx"
    });
})

module.exports = router