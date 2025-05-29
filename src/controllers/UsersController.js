const { hash, compare } = require('bcryptjs')
const User = require('../models/User')

const AppError = require('../utils/AppError')

class UsersController {
    async create(req, res) {
        const user = req.body
        const { name, email, password, role = "customer" } = user

        const existsOneUser = await User.find()

        if (existsOneUser.length === 0) user.role = "admin"

        if (password.length < 6) {
            throw new AppError('A senha precisa ter no mínimo 6 caracteres', 400)
        }

        if (role !== "customer" && role !== "admin") {
            throw new AppError('Acesso do usuário inválido.', 400)
        }

        if (!name || !email || !password) {
            throw new AppError('Todos os campos são obrigatórios!', 401)
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            throw new AppError('Já existe um usuário com este e-mail', 409)
        }

        const hashedPasswod = await hash(password, 8)
        user.password = hashedPasswod

        const newUser = await User.create(user)
        return res.status(201).json(newUser)
    }

    async update(req, res) {

        const { id } = req.user
        const { name, email, password, old_password } = req.body

        if (!name | !email) {
            throw new AppError('Todos os campos são obrigatórios!', 400)
        }

        const emailExists = await User.findOne({ email, _id: { $ne: id } });

        if (emailExists) {
            throw new AppError('Este email já está em uso', 404)
        }

        let userToUpdate = await User.findOne({ _id: id })

        if (!userToUpdate) {
            throw new AppError('Usuário não encontrado', 404)
        }

        if (password && !old_password) {
            throw new AppError('Informe a senha antiga!', 401)
        }

        if (password && old_password) {
            const checkPassword = await compare(old_password, user.password)

            if (!checkPassword) {
                throw new AppError('A senha antiga não confere', 401)
            }

            userToUpdate.password = await hash(password, 8)
        }

        userToUpdate.name = name
        userToUpdate.email = email

        await User.updateOne({ _id: id }, userToUpdate)

        return res.status(200).json(userToUpdate)
    }

    async delete(req, res) {
        const { id } = req.params
        if (!id) throw new AppError('Usuário inválido!', 400)
        try {
            await User.findByIdAndDelete(id)
            return res.json()
        } catch (error) {
            throw new AppError('Não foi possível remover o usuário!')
        }
    }
}

module.exports = UsersController