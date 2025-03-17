const Restaurant = require("../models/Restaurant")
const AppError = require("../utils/AppError")

class RestaurantsAccessController {
  async create(req, res) {
    const { restaurant_id } = req.body

    if (!restaurant_id) { throw new AppError('Restaurante inválido!', 400) }

    const restaurant = await Restaurant.findById(restaurant_id)

    if (!restaurant) { throw new AppError('Restaurante não encontrado!', 400) }

    req.session.restaurant_id = restaurant_id

    return res.json()
  }
}

module.exports = RestaurantsAccessController