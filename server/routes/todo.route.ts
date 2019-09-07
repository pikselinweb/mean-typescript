import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as passport from 'passport';
import { insert } from '../controllers';
import { requireOwner } from '../middleware';
import { todoDbModel } from '../models';
export const todoRouter = express.Router();
todoRouter.use(
  passport.authenticate('jwt', {
    session: false
  })
);
const insertFunction = async (req, res) => {
  try {
    const user = await insert(req.body);
    res.json(user);
  } catch (error) {
    res.send(error);
  }
};

const listTodo = async (req, res) => {
  try {
    const usr = req.user;
    const todoList = await todoDbModel.find({
      uid: usr._id
    });
    res.json(todoList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createToDo = async (req, res) => {
  try {
    const usr = req.user;
    const toDo = req.body;
    toDo.uid = usr._id;
    toDo.complete = false;
    const newTodo = new todoDbModel(toDo);
    await newTodo.save();
    const todoList = await todoDbModel.find({
      uid: usr._id
    });
    res.json(todoList);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateTodo = async (req, res) => {
  try {
    const usr = req.user;
    const toDo = req.body;
    await todoDbModel.findByIdAndUpdate(toDo._id, toDo);
    const todoList = await todoDbModel.find({
      uid: usr._id
    });
    res.json(todoList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const usr = req.user;
    const toDo = req.body;
    await todoDbModel.findByIdAndRemove(toDo._id);
    const todoList = await todoDbModel.find({
      uid: usr._id
    });
    res.json(todoList);
  } catch (error) {
    res.status(500).send(error);
  }
};
todoRouter.route('/').post(asyncHandler(insertFunction));
todoRouter.get('/list', listTodo);
todoRouter.post('/create', createToDo);
todoRouter.post('/update', requireOwner(), updateTodo);
todoRouter.post('/delete', requireOwner(), deleteTodo);
