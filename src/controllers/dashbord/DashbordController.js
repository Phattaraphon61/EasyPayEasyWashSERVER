const express = require('express')
const responseCode = require('../../configs/responseCode')
const DashbordModel = require('../../models/DashbordModel')
const UserModel = require('../../models/UserModel')
const WithdrawModel = require('../../models/WithdrawModel')
const WashingModel = require('../../models/WashingModel')
const DashbordDecorator = require('../../decorators/DashbordDecorator')

const router = express.Router()

router.get('/', async (request, response, next) => {
    // const dashbordModel = await DashbordModel.find()
    const washingModel = await WashingModel.find().count()
    const userModel = await UserModel.aggregate([
        { $group: { _id: null, user: { $sum: 1 }, balance: { $sum: "$balance" } } },
    ])
    const withdrawModel = await WithdrawModel.aggregate([{ $group: { _id: "$status", user: { $sum: 1 }, balance: { $sum: "$amount" } } },])
    // {

    //     $facet: {
    //         "success": [
    //             { $match: { status: { $in: ["approve", "rejected"] } } },
    //             { $count: "success" }
    //         ],
    //         "notsuccess": [
    //             { $match: { status: 'wait' } },
    //             { $count: "notsuccess" }
    //         ],
    //     }

    // }
    // let withdraw = (withdrawModel[0].success[0].success / (withdrawModel[0].success[0].success + withdrawModel[0].notsuccess[0].notsuccess)) * 100
    // console.log(dashbordModel,userModel,withdrawModel)
    // const decorator = await dashbordModel.map(dashbord => DashbordDecorator.Decorator(dashbord));withdraw.toFixed(1)
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: { "dashbordModel": washingModel, "userModel": userModel[0], "withdrawModel": withdrawModel }
    })
})
router.post('/', async (request, response, next) => {
    const dashbordModel = await DashbordModel(request.body).save()
    // const dashbordModel = await DashbordModel.updateMany(
    //     {
    //         $inc: { washing: request.body.washing, amounttotal: request.body.amounttotal },
    //     });
    // const decorator = await dashbordModel.map(dashbord => DashbordDecorator.Decorator(dashbord));
    response.json({
        code: responseCode.SUCCESS,
        message: 'success',
        data: "success"
    })
})

module.exports = router