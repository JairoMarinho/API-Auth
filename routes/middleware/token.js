const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Obter o token do cabeçalho da requisição
  const token = req.header('x-auth-token');
  
  // Verificar se o token não está presente
  if (!token) {
    return res.status(401).send('No token, authorization denied');
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    // Adicionar o ID do usuário à requisição
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};
