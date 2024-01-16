import authModel from '@models/auth.model';
import bcrypt from 'bcrypt';
import authUtil from 'utils/auth.util';

const authService = {
  signUp: async (id: string, password: string, name: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return await authModel.create({ id, password: hashedPassword, name });
  },

  signIn: async (id: string, password: string) => {
    const user: any = await authModel.findOne({ id });
    const isCorrectPassword = await bcrypt.compare(password, user?.password);

    if (isCorrectPassword) {
      const accessToken = authUtil.getAccessToken(user.id, user.name);
      const refreshToken = authUtil.getRefreshToken(user.id, user.name);

      return { accessToken, refreshToken };
    }
  },

  silentRefresh: (refreshToken: string) => {
    const { id, name } = authUtil.verifyRefreshToken(refreshToken);

    const newAccessToken = authUtil.getAccessToken(id, name);
    const newRefreshToken = authUtil.getRefreshToken(id, name);

    return { newAccessToken, newRefreshToken };
  },
};

export default authService;
