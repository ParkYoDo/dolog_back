import jwt from 'jsonwebtoken';

const authUtil = {
  getAccessToken: (uuid: string) => {
    const accessToken = jwt.sign({ uuid }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d',
    });
    return accessToken;
  },

  getRefreshToken: (uuid: string) => {
    const refreshToken = jwt.sign({ uuid }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '14d',
    });
    return refreshToken;
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

      if (decoded?.uuid) {
        return decoded?.uuid;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
};

export default authUtil;
