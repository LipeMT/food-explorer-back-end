const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require("../configs/upload")

const dishesRoutes = Router()

const DishesController = require('../controllers/DishesController')
const DishImageController = require('../controllers/DishImageController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const dishesController = new DishesController()
const dishImageController = new DishImageController()

dishesRoutes.use(ensureAuthenticated)
const upload = multer(uploadConfig.MULTER)

dishesRoutes.post('/', dishesController.create)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.put('/:id', dishesController.update)
dishesRoutes.delete('/:id', dishesController.delete)
dishesRoutes.patch('/image/:id', upload.single("image"), dishImageController.update)

module.exports = dishesRoutes