import authService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';
import authUtil from 'utils/auth.util';

const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body;
    try {
      const result = await authService.signUp(id, password);
      console.log(`[SIGNUP] : ${result.id}`);
      return res.status(200).json({ message: '회원가입에 성공하였습니다.', data: result });
    } catch (error: any) {
      console.log(error);
      if (error?.code === 11000)
        return res.status(200).json({ message: '이미 존재하는 ID입니다.' });
    }
  },

  signIn: async (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body;
    try {
      const result: any = await authService.signIn(id, password);
      console.log(`[SIGNUP] : ${id}(${result})`);
      if (result) {
        res.cookie('refreshToken', result.accessToken, {
          path: '/',
          httpOnly: true,
        });

        res
          .status(200)
          .json({ message: '로그인에 성공하였습니다.', accessToken: result.accessToken });
      }

      if (!result) {
        res.status(401).send({
          message: 'password is incorrect',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: '이미 존재하는 ID입니다.' });
    }
  },

  silentRefresh: async (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies?.refreshToken) {
      const refreshTokena = req.cookies.refreshToken;
      const userId = authUtil.verifyRefreshToken(refreshTokena);

      const accessToken = authUtil.getAccessToken(userId);
      const refreshToken = authUtil.getRefreshToken(userId);

      res.cookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
      });
      return res.status(200).json({ message: 'token 갱신 성공.', accessToken });
    }

    if (req.cookies?.refreshToken) {
      return res.status(200).json({ message: 'refresh token이 없어요' });
    }
  },
};

export default authController;
