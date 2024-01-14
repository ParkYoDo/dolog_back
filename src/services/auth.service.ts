import { Request, Response, NextFunction } from 'express';
import authModel from '@models/auth.model';
import * as bcrypt from 'bcrypt';

const authService = {
  signUp: async (id: string, password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new authModel({ id, password: hashedPassword });
    user
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  },

  signIn: async () => {},
};

export default authService;
