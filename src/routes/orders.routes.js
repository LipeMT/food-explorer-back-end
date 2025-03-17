const Router = require('express')

const ordersRouter = Router()

const OrdersController = require('../controllers/OrdersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const restaurantMiddleware = require('../middlewares/restaurantMiddleware')

const ordersController = new OrdersController()

ordersRouter.use(ensureAuthenticated)
ordersRouter.use(restaurantMiddleware)

ordersRouter.post('/', ordersController.create)

module.exports = ordersRouter