const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersValidateController{
    async index(req, res){
        const user = req.user

        const checkUserExists = await knex('users').where({id: user.id})
        
        if(checkUserExists.length === 0){
            throw new AppError("Usuário inválido", 401)
        }

        return res.json()
    }
}

module.exports = UsersValidateController