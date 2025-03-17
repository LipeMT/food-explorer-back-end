const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const AppError = require("../utils/AppError");

class RestaurantsController {
  async create(req, res) {
    const restaurantData = req.body
    const user_id = req.user.id

    const user = await User.findById(user_id)
    if (!user) throw new AppError('Usuário Inválido')

    const restaurant = await Restaurant.create(restaurantData)

    user.restaurants = [restaurant._id, ...user.restaurants]

    await User.findByIdAndUpdate(user_id, user)

    res.json(restaurant)
  }

  async findRestaurantsByUser(req, res) {
    const user_id = req.user.id

    const user = await User.findById(user_id)

    const restaurantByUser = await Restaurant.find({ _id: { $in: user.restaurants } })

    return res.json(restaurantByUser)
  }

  async delete(req, res) {
    const restaurant_id = req.params.id
    try {
      await Restaurant.findByIdAndDelete(restaurant_id)
    } catch (error) {
      throw new AppError('Não foi possível remover o restaurante', 400)
    }
    return res.json()
  }

  async update(req, res) {
    const restaurant_id = req.params.id
    const { name, cnpj, address } = req.body

    if (!name || !cnpj || !address) throw new AppError('Todos os campos são obrigatórios')

    try {
      await Restaurant.findByIdAndUpdate(restaurant_id, { name, cnpj, address })
    } catch (error) {
      throw new AppError('Não foi possível remover o restaurante', 400)
    }
    return res.json()
  }
}

module.exports = RestaurantsController