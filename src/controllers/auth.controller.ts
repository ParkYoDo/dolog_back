import { Request, Response, NextFunction } from 'express';
import authService from '@services/auth.service';

const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body;
    try {
      const result = await authService.signUp(id, password);
      res.status(200).json({ message: '회원가입에 성공하였습니다.', data: result });
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req: Request, res: Response, next: NextFunction) => {},
};

export default authController;
