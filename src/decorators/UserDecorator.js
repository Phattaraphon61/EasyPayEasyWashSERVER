const Decorator = (item) => {

  if (!item)
    return {}

  return {
    id: item._id,   
    userid: item.userid,
    name: item.name,
    balance: item.balance,
    total: item.total,
    bank: item.bank,
  }
}

module.exports = { Decorator }
