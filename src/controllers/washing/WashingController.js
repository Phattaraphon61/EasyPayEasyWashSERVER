const express = require('express')
const responseCode = require('../../configs/responseCode')
const WashingModel = require('../../models/WashingModel')
const DashbordModel = require('../../models/DashbordModel')
const WashingDecorator = require('../../decorators/WashingDecorator')

const router = express.Router()


router.post('/getinfo', async (request, response, next) => {
    console.log(request.body)
    const washingModel = await WashingModel.findOne({ 'washingid': request.body.washingid }).populate('userid')
    const decorator = await WashingDecorator.Decorator(washingModel)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})
router.post('/getmywashing', async (request, response, next) => {
    console.log(request.body)
    const washingModel = await WashingModel.find({'userid': request.body.userid})
    const decorator = await washingModel.map(mywashing => WashingDecorator.Decorator(mywashing));
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})

router.post('/login', async (request, response, next) => {
    console.log(request.body)
    await DashbordModel({amounttotal:0}).save();
    const washingModel = await WashingModel(request.body).save()
    const decorator = await WashingDecorator.Decorator(washingModel)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})

router.post('/update', async (request, response, next) => {
    console.log(request.body)
    const washingModel = await WashingModel.findOneAndUpdate({ washingid: request.body.washingid },
        {
            $set: { detail: request.body.detail, price: request.body.price },
        }, { 'new': true });
    const decorator = await WashingDecorator.Decorator(washingModel)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})
router.post('/logout', async (request, response, next) => {
    console.log(request.body)
    const washingModel = await WashingModel.remove({ 'washingid': request.body.washingid })
    const decorator = await WashingDecorator.Decorator(washingModel)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})


module.exports = router