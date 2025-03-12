const Category = require('../models/Category')

const AppError = require('../utils/AppError')

class CategoriesController {
    async create(req, res) {
        const { name } = req.body

        if (!name) {
            throw new AppError('O nome da categoria é obrigatório.', 400)
        }

        const checkCategoryNameIsUsed = await Category.findOne({ name })

        if (checkCategoryNameIsUsed) {
            throw new AppError('Já existe uma categoria com este nome.', 409)
        }

        try {
            await Category.create({ name })
        }
        catch (e) {
            console.error(e)
            throw new AppError('Já existe uma categoria com este nome.', 409)
        }

        return res.status(201).json()
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            await Category.deleteOne({ id })
        }
        catch (e) {
            throw new AppError('Esta categoria não existe.', 404)
        }

        return res.json()
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
        console.log(CategoryUptaded)

        res.json()
    }

    async index(req, res) {
        const categories = await Category.find()
        return res.json(categories)
    }

    async show(req, res) {
        const { id } = req.params
        const category = await Category.findById(id)

        return res.json(category)
    }
}

module.exports = CategoriesController