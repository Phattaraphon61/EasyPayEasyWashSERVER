const express = require('express')
const line = require('@line/bot-sdk');
const responseCode = require('../../configs/responseCode')
const WashingModel = require('../../models/WashingModel')
const DashbordModel = require('../../models/DashbordModel')
const WashingDecorator = require('../../decorators/WashingDecorator')


const router = express.Router()
const client = new line.Client({
    channelAccessToken: 'JRbTKiFeWeJckWFcvX1wIHNn1YYC06JLTkOjLWGn1kiYqb4PuxdBfAP4Mg8TVZ+YTcfu2CzYVCuXTiXLVIiDOU9mMfQRsArc/i/bZqolrVenBNMCfJ0hRDfXeZO9Cr9343yHXdGGiQCmPMAMMmd8ywdB04t89/1O/w1cDnyilFU='
});

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
    const washingModel = await WashingModel.find({ 'userid': request.body.userid })
    const decorator = await washingModel.map(mywashing => WashingDecorator.Decorator(mywashing));
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})

router.post('/login', async (request, response, next) => {
    console.log(request.body)
    await DashbordModel({ amounttotal: 0 }).save();
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
    const message = {
        type: 'text',
        text: 'ซักสำเร็จแล้วกรุณาไปรับเสื้อผ้าของท่านด้วย'
    };

    let washingModel;
    if (request.body.type == "addnoti") {
        washingModel = await WashingModel.findOneAndUpdate({ washingid: request.body.washingid },
            {
                $push: { noti: { lineid: request.body.lineid } },
            }, { 'new': true });
    }
    if (request.body.type == "noti") {
        washingModel = await WashingModel.findOneAndUpdate({ washingid: request.body.washingid },
            {
                $set: { noti: [] },
            });
        washingModel.noti.map((tt) => {
            console.log(tt.lineid)
            client.pushMessage(tt.lineid, message)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                });
        })
    }
    if (request.body.type == "edit") {
        washingModel = await WashingModel.findOneAndUpdate({ washingid: request.body.washingid },
            {
                $set: { detail: request.body.detail, price: request.body.price },
            }, { 'new': true });
    }
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