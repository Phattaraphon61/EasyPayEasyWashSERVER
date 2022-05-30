const express = require('express')
const responseCode = require('../../configs/responseCode')
const UserModel = require('../../models/UserModel')
const UserDecorator = require('../../decorators/UserDecorator')

const router = express.Router()


router.post('/create', async (request, response, next) => {
    console.log(request.body)
    const userModel = await UserModel(request.body).save()
    const decorator = await UserDecorator.Decorator(userModel)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})
router.post('/update', async (request, response, next) => {
    console.log(request.body)
    if (request.body.type == "addbalance") {
        await UserModel.updateOne({ userid: request.body.userid },
            {
                $inc: { balance: request.body.balance, total: request.body.balance },
            });
    }
    if (request.body.type == "withdraw") {
        await UserModel.updateOne({ userid: request.body.userid },
            {
                $inc: { balance: -request.body.balance },
            });
    } if (request.body.type == "bank") {
        await UserModel.updateOne({ userid: request.body.userid },
            {
                $push: { bank: { bank: request.body.bank, number: request.body.number, name: request.body.name } },
            });
    }
    const getuserModel = await UserModel.findOne({ userid: request.body.userid });
    const decorator = await UserDecorator.Decorator(getuserModel)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: decorator
    })
})


module.exports = router