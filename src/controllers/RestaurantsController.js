const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const AppError = require("../utils/AppError");

class RestaurantsController {
  async create(req, res) {
    const restaurantData = req.body
    const user_id = req.user.id

    const user = await User.findById(user_id)
    if (!user) throw new AppError('Usuário Inválido')
    if (user.role !== 'admin') throw new AppError('Ação não permitida ao usuário!', 404)

    const restaurantAlreadyExists = await Restaurant.findOne({ name: restaurantData.name, owner: user_id })
    if (restaurantAlreadyExists) throw new AppError('Já existe um restaurante com esse nome')

    restaurantData.owner = user_id
    const restaurant = await Restaurant.create(restaurantData)

    user.restaurants = [restaurant._id, ...user.restaurants]

    await User.findByIdAndUpdate(user_id, user)

    res.json(restaurant)
  }

  async findRestaurantsByUser(req, res) {
    const user_id = req.user.id
    const user = await User.findById(user_id)
    if (!user) throw new AppError('Usuário Inválido')

    try {
      const restaurantByUser = await Restaurant.find({ _id: { $in: user.restaurants } })
      return res.json(restaurantByUser)
    } catch (error) {
      throw new AppError('Não foi possível buscar os restaurantes', 400)
    }
  }

  async delete(req, res) {
    const restaurant_id = req.params.id
    const user_id = req.user.id

    const restaurantExists = await Restaurant.findOne({ _id: restaurant_id, owner: user_id })
    if(!restaurantExists) throw new AppError('Restaurante não encontrado!', 404)

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