const Category = require('../models/Category')
const Dish = require('../models/Dish')

const AppError = require('../utils/AppError')

class CategoriesController {
    async create(req, res) {
        const { name } = req.body
        const { restaurant_id } = req

        if (!restaurant_id) {
            throw new AppError('Restaurante não informado', 401)
        }

        if (!name) {
            throw new AppError('O nome da categoria é obrigatório.', 400)
        }

        const checkCategoryNameIsUsed = await Category.findOne({ name, restaurant: restaurant_id })

        if (checkCategoryNameIsUsed) {
            throw new AppError('Já existe uma categoria com este nome.', 409)
        }

        try {
            await Category.create({ name, restaurant: restaurant_id })
        }
        catch (e) {
            console.error(e)
            throw new AppError('Já existe uma categoria com este nome.', 409)
        }

        return res.status(201).json()
    }

    async delete(req, res) {
        const { id } = req.params
        const { restaurant_id } = req
        try {
            await Category.deleteOne({ _id: id, restaurant: restaurant_id })    
            await Dish.deleteMany({ category: id })
            return res.status(204).json()
        }
        catch (e) {
            throw new AppError('Esta categoria não existe.', 404)
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { name } = req.body

        if (!name) {
            throw new AppError('O nome da categoria é obrigatório.', 400)
        }

        const checkCategoryNameIsUsed = await Category.find({ name })

        if (checkCategoryNameIsUsed.length > 0 && checkCategoryNameIsUsed.some(category => category.id != id)) {
            throw new AppError('Já existe uma categoria com este nome.', 409)
        }

        const CategoryUptaded = await Category.updateOne({ id }, { name })

        res.json()
    }

    async index(req, res) {
        const restaurant = req.restaurant_id
        if (!restaurant) throw new AppError('Restaurante não informado', 401)

        try {
            const categories = await Category.find({ restaurant })
            return res.json(categories)

        } catch (e) {
            // console.log(e)
            throw new AppError('Erro ao buscar categorias', 500)
        }
    }

    async show(req, res) {
        const { id } = req.params
        const category = await Category.findById(id)

        return res.json(category)
    }
}

module.exports = CategoriesController