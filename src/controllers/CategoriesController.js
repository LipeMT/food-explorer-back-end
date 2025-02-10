const knex = require('../database/knex')

const AppError = require('../utils/AppError')

class CategoriesController {
    async create(req, res) {
        const { name } = req.body
        const user_id = req.user.id

        if (!name) {
            throw new AppError('O nome da categoria é obrigatório.', 400)
        }

        const checkCategoryNameIsUsed = await knex('categories').where({ name, user_id }).first()

        if (checkCategoryNameIsUsed) {
            throw new AppError('Já existe uma categoria com este nome.', 409)
        }

        try {
            await knex('categories').insert({ name, user_id })
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
            await knex('categories').where({ id }).delete()
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

        const checkCategoryNameIsUsed = await knex('categories').where({ name })

        if (checkCategoryNameIsUsed.length > 0 && checkCategoryNameIsUsed.some(category => category.id != id) ) {
            throw new AppError('Já existe uma categoria com este nome.', 409)
        }

        await knex('categories').update({ name }).where({id})

        res.json()
    }

    async index(req, res) {
        const categories = await knex('categories')//.where({ user_id: req.user.id })
        return res.json(categories)
    }

    async show(req, res) {
        const { id } = req.params

        const category = await knex('categories').where({ id, user_id: req.user.id }).first()

        return res.json(category)
    }
}

module.exports = CategoriesController