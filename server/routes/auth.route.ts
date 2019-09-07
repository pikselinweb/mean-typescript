import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as passport from 'passport';
import * as httpError from 'http-errors';
import { generateToken, insert, removePassword } from '../controllers';

import { USER } from '../models';
export const authRouter = express.Router();
const register = async (req, res, next) => {
  const createUser = await insert(req.body);
  switch (createUser.status) {
    case 'success':
      req.user = removePassword(createUser.user);
      next();
      break;
    case 'error-dublicate':
      next(new httpError(503));
      break;
    default:
      next(new httpError(400));
      break;
  }
};
const login = (req, res) => {
  const user: USER = req.user;
  const token = generateToken(user);
  res.json({ user, token });
};
authRouter.post('/register', asyncHandler(register), login);
authRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);
authRouter.get('/me', passport.authenticate('jwt', { session: false }), login);
