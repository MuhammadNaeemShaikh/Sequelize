const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(400).json(err);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(400).json('you are not authenticated');
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === 'super-admin') {
      next();
    } else {
      res.status(403).json('You are not alowed to do that!');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
};
