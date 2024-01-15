import authModel from '@models/auth.model';
import * as bcrypt from 'bcrypt';
import authUtil from 'utils/auth.util';

const authService = {
  signUp: async (id: string, password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return await authModel.create({ id, password: hashedPassword });
  },

  signIn: async (id: string, password: string) => {
    const user: any = await authModel.findOne({ id });
    const isCorrectPassword = await bcrypt.compare(password, user?.password);
    if (isCorrectPassword) {
      const accessToken = authUtil.getAccessToken(id);
      const refreshToken = authUtil.getRefreshToken(id);
      return { accessToken, refreshToken };
    }
    return false;
  },
};

export default authService;
