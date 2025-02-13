const knex = require('../database/knex')
const { hash, compare } = require('bcryptjs')

const AppError = require('../utils/AppError')

class UsersController {
    async create(req, res) {
        const { name, email, password, role = "customer" } = req.body

        if(password.length < 6){
            throw new AppError('A senha precisa ter no mínimo 6 caracteres', 400)
        }

        if(role !== "customer" && role !== "admin"){
            throw new AppError('Acesso do usuário inválido.', 400)
        }

        if (!name || !email || !password) {
            throw new AppError('Email e/ou senha incorreto(a)', 401)
        }

        const userExists = await knex("users").where({ email }).first()

        if (userExists) {
            throw new AppError('Já existe um usuário com este e-mail', 409)
        }

        const hashedPasswod = await hash(password, 8)

        await knex("users").insert({ name, email, password: hashedPasswod, role })

        return res.status(201).json()
    }

    async update(req, res) {
        const { id } = req.user
        
        const { name, email, password, old_password } = req.body

        const user = await knex("users").where({id}).first()

        if (!user) {
            throw new AppError('Usuário não encontrado', 404)
        }

        const checkEmailIsUsed = await knex("users").where({email}).first()

        if(checkEmailIsUsed && checkEmailIsUsed.id !== id){
            throw new AppError('Já existe um usuário com este e-mail', 409)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if (password && !old_password){
            throw new AppError('Informe a senha antiga!', 401)
        }


        if(password && old_password){
            const checkPassword = await compare(old_password, user.password)

            if(!checkPassword){
                throw new AppError('A senha antiga não confere', 401)
            }

            user.password = await hash(password, 8)
        }

        await knex("users").where({id}).update({
            name: user.name,
            email: user.email,
            password: user.password,
            updated_at: knex.fn.now()
        })

        return res.status(200).json()
    }
}

module.exports = UsersController