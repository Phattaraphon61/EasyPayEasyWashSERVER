
const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;
const genqrcode = async (item) => {
    let qr;
    // console.log("yesss", item)
    let message = await item.split(',')
    // console.log("id", message[0])
    // console.log("data", message[1])
    let token;
    await axios({
        method: 'post',
        url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',
        data: {
            "applicationKey": "l7d3bd0120f5aa48ff8f3f8c35389e0580",
            "applicationSecret": "c9210dbe131341dc854897716207689c"
        },
        headers: {
            "Content-Type": "application/json",
            "resourceOwnerId": "l7d3bd0120f5aa48ff8f3f8c35389e0580",
            "requestUid": `${uuidv4()}`,
            "accept-language": "EN",
        }
    }).then(res => {
        // console.log(res.data)
        const { accessToken, tokenType } = res.data.data
        // console.log(accessToken)
        // console.log(tokenType + " " + accessToken)
        token = tokenType + " " + accessToken
    }).catch(err => {
        qr = "error"
    })
    await axios({
        method: 'post',
        url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
        data: {
            "qrType": "PP",
            "amount": `${message[1]}`,
            "ppId": "178394498000863",
            "ppType": "BILLERID",
            "ref1": `${message[0]}`,
            "ref2": "EASYPAYEASYWASH",
            "ref3": "PUQ"
        },
        headers: {
            "Content-Type": "application/json",
            "authorization": token,
            "resourceOwnerId": "l7d3bd0120f5aa48ff8f3f8c35389e0580",
            "requestUid": `${uuidv4()}`,
            "accept-language": "EN",
        }
    }).then(res => {
        qr = res.data.data.qrRawData
    }).catch(err => {
        qr = "error"
    })
    return {"id":message[0],"qr":qr};
}

module.exports = { genqrcode }