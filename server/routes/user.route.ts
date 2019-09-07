import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as passport from 'passport';
import { insert, removePassword } from '../controllers';
import { userDbModel, USER } from '../models';

import { uploadPP } from '../config';

export const userRouter = express.Router();
userRouter.use(
  passport.authenticate('jwt', {
    session: false
  })
);
const insertFunction = async (req, res) => {
  const user = await insert(req.body);
  res.json(user);
};
const updateUser = async (req, res) => {
  try {
    const usr = req.user;
    const usrInfo = req.body;
    const dbUser: USER = await userDbModel.findByIdAndUpdate(usr._id, usrInfo, {
      new: true
    });

    res.json(removePassword(dbUser));
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateProfilePicture = async (req, res) => {
  try {
    const usr = req.user;
    const pImg = req.body.profilePicture;
    const updateImg = await uploadPP(pImg, usr._id);
    usr.profilePicture = {
      url: updateImg.url,
      public_id: updateImg.public_id
    };
    const dbUser: USER = await userDbModel.findByIdAndUpdate(usr._id, usr, {
      new: true
    });
    res.json(removePassword(dbUser));
  } catch (error) {
    res.status(500).send(error);
  }
};
userRouter.route('/').post(asyncHandler(insertFunction));
userRouter.post('/update', updateUser);
userRouter.post('/updateImg', updateProfilePicture);
