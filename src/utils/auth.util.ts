import jwt from 'jsonwebtoken';

const authUtil = {
  getAccessToken: (id: string, name: string) => {
    const accessToken = jwt.sign({ id, name }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d',
    });
    return accessToken;
  },

  getRefreshToken: (id: string, name: string) => {
    const refreshTokent = jwt.sign({ id, name }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '14d',
    });
    return refreshTokent;
  },

  verifyAccessToken: (accessToken: any) => {
    try {
      const decoded: any = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!);
      return { message: 'success', id: decoded?.id };
    } catch (error: any) {
      return { message: error.message };
    }
  },

  verifyRefreshToken: (refreshToken: string) => {
    try {
      const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY!);
      if (decoded?.id) {
        return decoded?.id;
      }
      return false;
    } catch (error: any) {
      return false;
    }
  },
};

export default authUtil;
