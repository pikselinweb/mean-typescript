import * as bcrypt from 'bcryptjs';
import * as Joi from '@hapi/joi';
import { userDbModel } from '../models';

const userSchema = Joi.object({
  // fullname: Joi.string().required(),
  email: Joi.string().email(),
  // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
});

export const insert = async user => {
  try {
    const userExit = await userDbModel.findOne({ email: user.email });
    if (userExit) {
      return { status: 'error-dublicate', user };
    } else {
      user = await Joi.validate(user, userSchema, {
        abortEarly: false
      });
      user.hashedPassword = bcrypt.hashSync(user.password, 10);
      delete user.password;
      const newUser = await new userDbModel(user).save();
      return { status: 'success', user: newUser };
    }
  } catch (error) {
    return { status: 'error', user };
  }
};
