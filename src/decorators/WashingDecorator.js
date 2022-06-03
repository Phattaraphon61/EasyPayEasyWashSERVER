const moment = require('moment')
const constants = require('../configs/constants')
const Decorator = (item) => {

  if (!item)
    return {}

  return {
    id: item._id,
    washingid: item.washingid,
    userid: item.userid,
    detail: item.detail,
    price: item.price,
  }
}

module.exports = { Decorator }
