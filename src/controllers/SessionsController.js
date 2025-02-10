const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')

const authConfig = require('../configs/auth')

const { sign } = require('jsonwebtoken')

class SessionsController {
    async create(req, res) {
        const { email, password, name } = req.body

        const user = await knex('users').where({ email }).first()   

        if (!user) {
            throw new AppError("Email e/ou senha incorreta", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Email e/ou senha incorreto(a)', 401)
        }

        delete user.password

        const { expiresIn, secret } = authConfig.jwt

        const token = sign({role: user.role}, secret, {
            subject: String(user.id),
            expiresIn,
        })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 150 * 60 *1000,
        })

        return res.status(201).json({ user })
    }

    async delete(req, res){
        res.clearCookie("token");
        return res.status(204).send();
    }
}

module.exports = SessionsController