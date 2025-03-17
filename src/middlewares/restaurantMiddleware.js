const AppError = require("../utils/AppError")

function restaurantMiddleware(req, res, next) {
  if (!req.session.restaurant_id) { throw new AppError('Nenhum restaurante selecionado') }
  req.restaurant_id = req.session.restaurant_id
  next()
}

module.exports = restaurantMiddleware