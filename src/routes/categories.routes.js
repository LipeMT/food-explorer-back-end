const { Router } = require('express')

const categoriesRoutes = Router()

const CategoriesController = require('../controllers/CategoriesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const categoriesController = new CategoriesController()

categoriesRoutes.use(ensureAuthenticated)

categoriesRoutes.post('/', categoriesController.create)
categoriesRoutes.delete('/:id', categoriesController.delete)
categoriesRoutes.get('/', categoriesController.index)
categoriesRoutes.get('/:id', categoriesController.show)
categoriesRoutes.put('/:id', categoriesController.update)

module.exports = categoriesRoutes