const AppError = require("../utils/AppError")

function restaurantMiddleware(req, res, next) {
  const authHeader = req.headers;

  if (!authHeader.cookie) {
    throw new AppError('Restaurante não informado', 401);
  }
  try {
    let separatedCookies = authHeader.cookie.split(' ')
    let restaurantCookie = separatedCookies.find(cookie => cookie.includes('restaurant_id'))
    let [, restaurant_id] = restaurantCookie.split('restaurant_id=');
    
    restaurant_id = restaurant_id.split(';')[0]

    req.restaurant_id = restaurant_id
    return next();
  } catch {
    throw new AppError('Restaurante inválido', 401);
  }
}

module.exports = restaurantMiddleware