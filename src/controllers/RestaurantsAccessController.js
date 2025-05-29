const Restaurant = require("../models/Restaurant")
const AppError = require("../utils/AppError")

class RestaurantsAccessController {
  async create(req, res) {
    const { restaurant_id } = req.body

    if (!restaurant_id) { throw new AppError('Restaurante inválido!', 400) }

    const restaurant = await Restaurant.findById(restaurant_id)

    if (!restaurant) { throw new AppError('Restaurante não encontrado!', 400) }

    res.cookie('restaurant_id', restaurant_id, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    return res.json(restaurant_id)
  }

  async delete(req, res) {
    res.clearCookie('restaurant_id')
    return res.status(204).send();
  }
}

module.exports = RestaurantsAccessController