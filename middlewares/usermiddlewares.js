import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
}

export const createUserMiddleware = async (req, res, next) => {
    try {
        const {password} = req.body

        console.log(password);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        req.body.password = hash

        next()
    } catch (error) {
        res.status(400).json(error)
    }
}