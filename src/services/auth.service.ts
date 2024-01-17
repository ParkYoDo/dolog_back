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
    console.log(isCorrectPassword);

    if (isCorrectPassword) {
      const accessToken = authUtil.getAccessToken(user.id, user.name);
      const refreshToken = authUtil.getRefreshToken(user.id, user.name);

      return { accessToken, refreshToken };
    }
  },

  silentRefresh: (oldRefreshToken: string) => {
    const { id, name } = authUtil.verifyRefreshToken(oldRefreshToken);

    const accessToken = authUtil.getAccessToken(id, name);
    const refreshToken = authUtil.getRefreshToken(id, name);

    return { accessToken, refreshToken };
  },
};

export default authService;
