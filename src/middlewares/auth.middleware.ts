import { Request, Response, NextFunction } from 'express';
import authUtil from 'utils/auth.util';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const refreshToken = req.headers.authorization.split('Bearer ')[1];
    const isValidRefreshToken = authUtil.verifyRefreshToken(refreshToken);
  }
};

export default authentication;
