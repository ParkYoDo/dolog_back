import { Request, Response, NextFunction } from 'express';
import authUtil from '../utils/auth.util';

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization);
  const accessToken = req.headers.authorization?.split('Bearer ')[1];
  if (!accessToken) return res.status(403).json({ message: 'Access Token none' });

  try {
    const decoded = authUtil.verifyAccessToken(accessToken);
    if (!decoded) return res.status(403).json({ message: 'Access Token expiration' });
    return next();
  } catch (error) {
    console.log(error);
  }
};

export default jwtMiddleware;
