const knex = require('../database/knex')

const AppError = require('../utils/AppError')

class DishesController {
    async create(req, res) {
        const { name, category: category_id, ingredients, price, description } = req.body

        const user_id = req.user.id

        if (!name || !category_id || !price || !description) {
            throw new AppError('Todos os campos são obrigatórios', 400)
        }

        const checkDishNameIsUsed = await knex("dishes").where({ name, user_id }).first()

        if (checkDishNameIsUsed) {
            throw new AppError('Já existe um prato com este nome', 409)
        }

        const [dish_id] = await knex("dishes").insert({ name, price, description, user_id, category_id })

        if (ingredients?.length > 0) {
            const ingredientsInsert = ingredients.map(ingredient => {
                return {
                    dish_id,
                    name: ingredient,
                    user_id
                }
            })
            await knex("ingredients").insert(ingredientsInsert)
        }
        return res.status(201).json({ dish_id })
    }

    async index(req, res) {
        const user_id = req.user.id

        const { title, ingredients } = req.query

        let dishes

        if (ingredients && title) {
            const filterIngredients = ingredients.split(',').map(ingredients => ingredients.trim())

            dishes = await knex("dishes")
                .innerJoin('ingredients', 'dishes.id', 'ingredients.dish_id')
                // .where("dishes.user_id", user_id)
                .whereLike("dishes.name", `%${title}%`)
                .whereIn('ingredients.name', filterIngredients)
                .groupBy('dishes.id')
                .select('dishes.*')

        } else if (title) {
            dishes = await knex("dishes")
                // .where({ user_id })
                .whereLike("name", `%${title}%`)
        } else {
            dishes = await knex("dishes")
            // .where({ user_id })
        }

        const userIngredients = await knex("ingredients").where({ user_id })

        const dishesWithIngredients = dishes.map(dish => {
            const dishIngredients = userIngredients.filter(userIngredient => userIngredient.dish_id === dish.id);

            return {
                ...dish,
                ingredients: dishIngredients
            }
        })

        return res.json(dishesWithIngredients)
    }

    async show(req, res) {
        const dish_id = req.params.id

        const dish = await knex("dishes").where({ id: dish_id }).first()

        if (!dish) {
            throw new AppError('Prato não encontrado', 404)
        }

        const ingredients = await knex("ingredients").where({ dish_id })

        dish.ingredients = ingredients

        return res.json(dish)
    }

    async update(req, res) {
        const user_id = req.user.id

        const dish_id = req.params.id

        const { name, category: category_id, ingredients, price, description } = req.body

        if (!name || !category_id || !ingredients || !price || !description) {
            throw new AppError('Todos os campos são obrigatórios', 404)
        }

        const dish = await knex("dishes").where({ user_id, id: dish_id }).first()

        if (!dish) {
            throw new AppError('Prato não encontrado', 404)
        }

        dish.name = name ?? dish.name
        dish.category_id = category_id ?? dish.category_id
        dish.price = price ?? dish.price
        dish.description = description ?? dish.description

        const old_ingredients = await knex("ingredients").where({ user_id, dish_id })
        const old_ingredients_names = old_ingredients.map(old_ingredient => old_ingredient.name)

        const ingredientsToAdd = ingredients.filter(ingredient => !old_ingredients_names.includes(ingredient))

        const ingredientsToRemove = old_ingredients_names.filter(old_ingredient => !ingredients.includes(old_ingredient))

        if (ingredientsToAdd.length > 0) {
            await knex("ingredients").insert(ingredientsToAdd.map(ingredient => {
                return {
                    dish_id,
                    name: ingredient,
                    user_id
                }
            }))
        }

        if (ingredientsToRemove.length > 0) {
            await knex("ingredients").where({ dish_id, user_id }).whereIn('name', ingredientsToRemove).delete()
        }

        await knex("dishes").where({ user_id, id: dish_id }).update(dish)

        return res.json()
    }

    async delete(req, res) {
        const user_id = req.user.id

        const dish_id = req.params.id

        const dish = await knex("dishes").where({ user_id, id: dish_id }).first()

        if (!dish) {
            throw new AppError('Prato não encontrado', 404)
        }

        await knex("ingredients").where({ dish_id, user_id }).delete()

        await knex("dishes").where({ user_id, id: dish_id }).delete()

        return res.status(204).send()
    }
}

module.exports = DishesController