const { Router } = require('express')
const restaurantsRouter = Router()

const RestaurantsController = require('../controllers/RestaurantsController')
const restaurantsController = new RestaurantsController()

const RestaurantsAccessController = require('../controllers/RestaurantsAccessController')
const restaurantsAccessController = new RestaurantsAccessController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

restaurantsRouter.use(ensureAuthenticated)

restaurantsRouter.post('/', restaurantsController.create)
restaurantsRouter.get('/', restaurantsController.findRestaurantsByUser)
restaurantsRouter.post('/access', restaurantsAccessController.create)
restaurantsRouter.put('/:id', restaurantsController.update)
restaurantsRouter.delete('/:id', restaurantsController.delete)

module.exports = restaurantsRouter