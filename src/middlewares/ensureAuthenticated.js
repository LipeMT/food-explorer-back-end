const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers;

  if (!authHeader.cookie) {
    throw new AppError('JWT token não informado', 401);
  }

  const [, token] = authHeader.cookie.split('token=');

  try {
    const { sub: user_id, role } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: user_id,
      role
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

module.exports = ensureAuthenticated;