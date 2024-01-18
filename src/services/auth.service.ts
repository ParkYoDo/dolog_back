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
      const uuid = user._id.toString();
      const accessToken = authUtil.getAccessToken(uuid);
      const refreshToken = authUtil.getRefreshToken(uuid);

      return { accessToken, refreshToken, uuid };
    }
  },

  silentRefresh: (oldRefreshToken: string) => {
    const uuid = authUtil.verifyRefreshToken(oldRefreshToken);

    const accessToken = authUtil.getAccessToken(uuid);
    const refreshToken = authUtil.getRefreshToken(uuid);

    return { accessToken, refreshToken };
  },
};

export default authService;
