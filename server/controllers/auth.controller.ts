import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateToken = user => {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
};
