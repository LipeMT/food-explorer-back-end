const { hash, compare } = require('bcryptjs')
const User = require('../models/User')

const AppError = require('../utils/AppError')

class UsersController {
    async create(req, res) {

        const user = req.body
        const { name, email, password, role } = user

        if (password.length < 6) {
            throw new AppError('A senha precisa ter no mínimo 6 caracteres', 400)
        }

        if (role !== "customer" && role !== "admin") {
            throw new AppError('Acesso do usuário inválido.', 400)
        }

        if (!name || !email || !password) {
            throw new AppError('Email e/ou senha incorreto(a)', 401)
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

        const user = req.user
        const { id } = user

        const { name, email, password, old_password } = req.body

        const userExists = User.findOne({ id })

        if (!userExists) {
            throw new AppError('Usuário não encontrado', 404)
        }

        const emailExists = await User.findOne({ email, _id: { $ne: id } });

        if (emailExists) {
            throw new AppError('Este email já está em uso', 404)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if (password && !old_password) {
            throw new AppError('Informe a senha antiga!', 401)
        }

        if (password && old_password) {
            const checkPassword = await compare(old_password, user.password)

            if (!checkPassword) {
                throw new AppError('A senha antiga não confere', 401)
            }

            user.password = await hash(password, 8)
        }

        delete user.id

        const updatedUser = await User.findOne({ _id: id })

        if (!updatedUser) {
            throw new AppError('Usuário não encontrado', 404)
        }

        let userToUpdate = new User(user)
        
        userToUpdate = userToUpdate.toObject()
        console.log(updatedUser)
        delete userToUpdate._id

        await User.findByIdAndUpdate({ _id: id }, userToUpdate, {})

        return res.status(200).json(userToUpdate)
    }
}

module.exports = UsersController