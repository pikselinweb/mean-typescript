import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt';
import * as bcrypt from 'bcryptjs';
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
import * as httpError from 'http-errors';
import { config } from './config';
import { userDbModel, USER } from '../models';

import { removePassword } from '../controllers';
const localLogin = new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    const user: USER = await userDbModel.findOne({
      email
    });

    if (!user) {
      return done(new httpError(404));
    } else {
      const chekcPw = await bcrypt.compare(password, user.hashedPassword);
      if (chekcPw) {
        done(null, removePassword(user));
      } else {
        return done(null, false);
      }
    }
  }
);
const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
  },
  async (payload, done) => {
    const user: USER = await userDbModel.findById(payload._id);
    if (!user) {
      return done(null, false);
    }

    done(null, removePassword(user));
  }
);
passport.use(jwtLogin);
passport.use(localLogin);
export { passport };
