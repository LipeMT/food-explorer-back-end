const { Router } = require('express')

const sessionsRoutes = Router()

const SessionsController = require('../controllers/SessionsController')

const sessionsController = new SessionsController()

sessionsRoutes.post('/', sessionsController.create)
sessionsRoutes.delete('/', sessionsController.delete)

module.exports = sessionsRoutes