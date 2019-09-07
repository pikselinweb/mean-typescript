import * as mongoose from 'mongoose';
// Define collection and schema for todo item
const todo = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true
    },
    task: {
      type: String,
      required: true
    },
    complete: {
      type: Boolean
    }
  },
  {
    collection: 'todos'
  }
);
export const todoDbModel = mongoose.model('Todo', todo);
