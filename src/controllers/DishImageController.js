const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishImageController{
    async update(req, res){
        const user_id = req.user.id
        const avatarFileName = req.file.filename

        const dish_id  = req.params.id
        console.log(dish_id)

        const diskStorage = new DiskStorage()

        const dish = await knex("dishes").where({id: dish_id}).first()

        if(!dish){
            throw new AppError("Prato não encontrado", 404)
        }

        if(dish.image){
            await diskStorage.deleteFile(dish.image)
        }

        const filename = await diskStorage.saveFile(avatarFileName)

        dish.image = filename

        await knex("dishes").where({id: dish_id}).update(dish)

        res.json(dish)
    }
}

module.exports = DishImageController