import * as express from 'express';
import { authRouter } from './auth.route';
import { userRouter } from './user.route';
import { todoRouter } from './todo.route';
export const indexRouter = express.Router();
indexRouter.get('/health-check', (req, res) => res.send('OK'));

indexRouter.use('/auth', authRouter);
indexRouter.use('/user', userRouter);
indexRouter.use('/todo', todoRouter);
