import * as mongoose from 'mongoose';

//NOT: refactor this
//Track who is creating a todo on the TODO model
//Implement get all todo by the user ID
export const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export interface Todo extends mongoose.Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export const Todo = mongoose.model('Todo', TodoSchema);
