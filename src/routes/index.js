const { Router } = require('express')
const session = require('express-session')

const usersRoutes = require('./users.routes')
const sessionsRoutes = require('./sessions.routes')
const dishesRoutes = require('./dishes.routes')
const categoriesRoutes = require('./categories.routes')
const ordersRouter = require('./orders.routes')
const restaurantsRouter = require('./restaurants.routes')
const restaurantsAccessRouter = require('./restaurantsAccess.routes')

const routes = Router()

routes.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/orders', ordersRouter)
routes.use('/restaurants', restaurantsRouter)
routes.use('/restaurants-access', restaurantsAccessRouter)

module.exports = routes