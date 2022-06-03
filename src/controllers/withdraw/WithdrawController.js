const express = require('express')
const responseCode = require('../../configs/responseCode')
const WithdrawModel = require('../../models/WithdrawModel')
const UserModel = require('../../models/UserModel')
const WithdrawDecorator = require('../../decorators/WithdrawDecorator')

const router = express.Router()
router.post('/create', async (request, response, next) => {
    console.log(request.body)
    const withdrawModel = await WithdrawModel(request.body).save()
    await UserModel.updateOne({ _id: request.body.userid },
        {
            $inc: { balance: -request.body.amount },
        });
    const decorator = await WithdrawDecorator.Decorator(withdrawModel)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})
router.post('/update', async (request, response, next) => {
    console.log(request.body)
    const withdrawModel = await WithdrawModel.findOneAndUpdate({ _id: request.body.id },
        {
            $set: { status: request.body.status },
        }, { 'new': true });
    const decorator = await WithdrawDecorator.Decorator(withdrawModel)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})
router.post('/getstatus', async (request, response, next) => {
    console.log(request.body)
    const withdrawModel = await WithdrawModel.find({ status: request.body.status })
    const decorator = await withdrawModel.map(withdraw => WithdrawDecorator.Decorator(withdraw));
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})
router.post('/getmywithdraw', async (request, response, next) => {
    console.log(request.body)
    const withdrawModel = await WithdrawModel.find({ userid: request.body.userid })
    const decorator = await withdrawModel.map(withdraw => WithdrawDecorator.Decorator(withdraw));
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})

module.exports = router