import { Request, Response, NextFunction } from 'express';
import authUtil from 'utils/auth.util';

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const refreshToken = req.headers.authorization.split('Bearer ')[1];
    const isValidRefreshToken = authUtil.verifyRefreshToken(refreshToken);
  }
};

export default jwtMiddleware;
