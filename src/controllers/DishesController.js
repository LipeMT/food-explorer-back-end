const { default: mongoose } = require('mongoose')
const Category = require('../models/Category')
const Dish = require('../models/Dish')
const AppError = require('../utils/AppError')

class DishesController {
    async create(req, res) {
        const { name, category, ingredients, price, description, image } = req.body
        const restaurant_id = req.restaurant_id

        if (!name || !category || !price || !description) {
            throw new AppError('Todos os campos são obrigatórios', 400)
        }

        const checkDishNameIsUsed = await Dish.findOne({ name, restaurant: restaurant_id })

        if (checkDishNameIsUsed) {
            throw new AppError('Já existe um prato com este nome', 409)
        }

        const checkCategoryExists = await Category.findOne({ _id: category })

        if (!checkCategoryExists) {
            throw new AppError('Esta categoria não existe', 404)
        }
        const newDish = await Dish.create({ name, price, description, ingredients, category: checkCategoryExists._id, restaurant: restaurant_id })

        return res.status(201).json(newDish)
    }

    async index(req, res) {
        const restaurant = req.restaurant_id
        if (!restaurant) throw new AppError('Restaurante não informado', 401)

        try {
            const dishes = await Dish.find({ restaurant })
            return res.json(dishes)
        } catch (error) {
            throw new AppError('Erro ao buscar pratos', 400)
        }

    }

    async show(req, res) {
        const dish_id = req.params.id
        const { restaurant_id } = req

        if (!mongoose.Types.ObjectId.isValid(dish_id)) throw new AppError('Prato não encontrado', 404)

        const dish = await Dish.findOne({ _id: dish_id, restaurant: restaurant_id })

        if (!dish) throw new AppError('Prato não encontrado', 404)

        return res.json(dish)
    }

    async update(req, res) {
        const dish_id = req.params.id
        const { restaurant_id } = req

        if (!mongoose.Types.ObjectId.isValid(dish_id)) throw new AppError('Prato não encontrado', 404)

        const { name, category: category_id, ingredients, price, description } = req.body

        if (!name || !category_id || !ingredients || !price || !description) {
            throw new AppError('Todos os campos são obrigatórios', 404)
        }

        const dishNameIsUsed = await Dish.findOne({ name, restaurant: restaurant_id, _id: { $ne: dish_id } });

        if (dishNameIsUsed) throw new AppError('Já existe um prato com esse nome')

        const dish = await Dish.findOne({ _id: dish_id, restaurant: restaurant_id })

        if (!dish) {
            throw new AppError('Prato não encontrado', 404)
        }

        if (!mongoose.Types.ObjectId.isValid(String(category_id))) throw new AppError('Categoria inválida', 404)
        const checkCategoryExists = await Category.findById(category_id)

        if (!checkCategoryExists) {
            throw new AppError('Esta categoria não existe', 404)
        }

        dish.name = name
        dish.category = category_id
        dish.ingredients = ingredients
        dish.price = price
        dish.description = description

        delete dish._id
        await Dish.updateOne({ _id: dish_id }, dish)

        return res.json()
    }

    async delete(req, res) {
        const dish_id = req.params.id

        const dish = await Dish.findOne({ _id: dish_id })

        if (!dish) {
            throw new AppError('Prato não encontrado', 404)
        }

        await Dish.deleteOne({ _id: dish_id })

        return res.status(204).send()
    }
}

module.exports = DishesController