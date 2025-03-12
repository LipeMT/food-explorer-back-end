const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')
const Dish = require('../models/Dish')

class DishImageController {
    async update(req, res) {
        const avatarFileName = req.file.filename

        const dish_id = req.params.id

        const diskStorage = new DiskStorage()

        const dish = await Dish.findOne({ id: dish_id })

        if (!dish) {
            throw new AppError("Prato não encontrado", 404)
        }

        if (dish.image) {
            await diskStorage.deleteFile(dish.image)
        }

        const filename = await diskStorage.saveFile(avatarFileName)

        dish.image = filename

        delete dish._id
        // await knex("dishes").where({ id: dish_id }).update(dish)
        await Dish.updateOne({ id: dish }, dish)

        res.json(dish)
    }
}

module.exports = DishImageController