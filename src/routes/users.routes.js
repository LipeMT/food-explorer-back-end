const { Router } = require('express')

const usersRoutes = Router()

const UsersController = require('../controllers/UsersController')
const UsersValidateController = require('../controllers/UsersValidateController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersController = new UsersController()
const usersValidateController = new UsersValidateController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.get('/validated', ensureAuthenticated, usersValidateController.index)

module.exports = usersRoutes