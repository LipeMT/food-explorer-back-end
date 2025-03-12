const { default: mongoose } = require('mongoose')
const Category = require('../models/Category')
const Dish = require('../models/Dish')
const AppError = require('../utils/AppError')

class DishesController {
    async create(req, res) {
        const { name, category: category_id, ingredients, price, description } = req.body

        const user_id = req.user.id

        if (!name || !category_id || !price || !description) {
            throw new AppError('Todos os campos são obrigatórios', 400)
        }

        const checkDishNameIsUsed = await Dish.findOne({ name })

        if (checkDishNameIsUsed) {
            throw new AppError('Já existe um prato com este nome', 409)
        }

        const checkCategoryExists = await Category.findOne({ _id: category_id })

        if (!checkCategoryExists) {
            throw new AppError('Esta categoria não existe', 404)
        }
        const newDish = await Dish.create({ name, price, description, ingredients, user_id, category_id })

        return res.status(201).json(newDish)
    }

    async index(req, res) {
        const dishes = await Dish.find()

        return res.json(dishes)
    }

    async show(req, res) {
        const dish_id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(dish_id)) throw new AppError('Prato não encontrado', 404)

        const dish = await Dish.findById(dish_id)

        if (!dish) throw new AppError('Prato não encontrado', 404)

        return res.json(dish)
    }

    async update(req, res) {
        const dish_id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(dish_id)) throw new AppError('Prato não encontrado', 404)

        const { name, category: category_id, ingredients, price, description } = req.body

        if (!name || !category_id || !ingredients || !price || !description) {
            throw new AppError('Todos os campos são obrigatórios', 404)
        }

        const dish = await Dish.findOne({ _id: dish_id })

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
        console.log(dish)
        await Dish.updateOne({ _id: dish_id }, dish)

        return res.json()
    }

    async delete(req, res) {
        const dish_id = req.params.id

        const dish = await Dish.findOne({ _id: dish_id })

        if (!dish) {
            throw new AppError('Prato não encontrado', 404)
        }

        const deleted = await Dish.deleteOne({ _id: dish_id })

        return res.status(204).send()
    }
}

module.exports = DishesController