const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers;

  if (!authHeader.cookie) {
    throw new AppError('JWT token não informado', 401);
  }

  try {
    let separatedCookies = authHeader.cookie.split(' ')
    separatedCookies = separatedCookies.find(cookie => cookie.includes('token'))
    let [, token] = separatedCookies.split('token=');
    token = token.split(';')[0]
      
    const { sub: user_id, role } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: user_id,
      role
    };
    return next();
  } catch {
    throw new AppError('Token de autenticação inválido', 401);
  }
}

module.exports = ensureAuthenticated;