import jwt from 'jsonwebtoken';

class ValidateToken {
  static verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (token) {
      const secret = process.env.SECRET;
      return jwt.verify(token, secret, (err, data) => {
        if (err) {
          return res.status(401).json({
            message: 'Authentication failed. Token is not valid',
          });
        }
        req.user = data;
        next();
      });
    }
    return res.status(403).json({
      message: 'You need to sign up or sign in',
    });
  }

  static generateToken(data, expiresIn) {
    return jwt.sign({ ...data }, process.env.SECRET, { expiresIn });
  }
}

export default ValidateToken;
