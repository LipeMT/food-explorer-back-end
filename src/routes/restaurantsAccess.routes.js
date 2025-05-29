const { Router } = require('express')
const restaurantsAccessRouter = Router()

const RestaurantsAccessController = require('../controllers/RestaurantsAccessController')
const restaurantsAccessController = new RestaurantsAccessController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

restaurantsAccessRouter.use(ensureAuthenticated)
restaurantsAccessRouter.post('/', restaurantsAccessController.create)
restaurantsAccessRouter.delete('/', restaurantsAccessController.delete)

module.exports = restaurantsAccessRouter