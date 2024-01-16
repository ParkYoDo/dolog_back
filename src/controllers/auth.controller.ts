import authService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    const { id, password, name } = req.body;
    try {
      const result = await authService.signUp(id, password, name);
      console.log(`[SIGN UP] : ${result.id}`);

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
      const { accessToken, refreshToken }: any = await authService.signIn(id, password);
      console.log(`[SIGN IN] : ${id}`);

      if (accessToken && refreshToken) {
        res.cookie('refreshToken', refreshToken, {
          path: '/',
          httpOnly: true,
        });

        res.status(200).json({ message: '로그인에 성공하였습니다.', accessToken });
      }

      if (!(accessToken && refreshToken)) {
        res.status(401).send({
          message: '로그인 실패',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: '로그인 실패.' });
    }
  },

  silentRefresh: async (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies?.refreshToken) {
      try {
        const { newAccessToken, newRefreshToken }: any = authService.silentRefresh(
          req.cookies.refreshToken,
        );
        console.log(`[silentRefresh] : Token Refreshed`);

        res.cookie('refreshToken', newRefreshToken, {
          path: '/',
          httpOnly: true,
        });

        return res.status(200).json({ message: 'token 갱신 성공.', newAccessToken });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.cookies?.refreshToken) {
      return res.status(200).json({ message: 'refresh token이 없어요' });
    }
  },
};

export default authController;
