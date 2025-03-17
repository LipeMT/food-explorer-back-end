const Order = require('../models/Order')
const Dish = require('../models/Dish')
const AppError = require('../utils/AppError')

class OrdersController {
  async create(req, res) {
    const order = req.body
    // const user = req.user

    const { items, total } = order

    if (items.length === 0) {
      throw new AppError('Todos os campos são obrigatórios', 400)
    }

    await Promise.all(
      items.map(async item => {
        const dish = await Dish.findById(item.dish)
        if(!dish) throw new AppError('Prato não encontrado!', 400)
        item.dish = dish
        return item
      }))

    let totalValue = 0

    for (const item of items) {
      const itemPrice = Number(item.dish.price.replace(',', '.'))
      totalValue += itemPrice * item.quantity
    }

    if (total !== totalValue) throw new AppError('Valor inválido!', 400)

    // if (!user) {
    //   res.cookie("order", order, {
    //     httpOnly: true,
    //     sameSite: "none",
    //     secure: true,
    //     maxAge: 150 * 60 * 1000,
    //   })
    // } else {
    await Order.create(order)
    // }

    return res.status(201).json()
  }

  async update() {

  }

  async delete() {

  }
}

module.exports = OrdersController