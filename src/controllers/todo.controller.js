import Todo from '../models/Todo.js';

export async function createTodo(req, res, next) {
  try {
    const todo = await Todo.create({ ...req.body, user: req.user.id });
    res.status(201).json({ message: 'Created', data: todo });
  } catch (e) { next(e); }
}

export async function getTodos(req, res, next) {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ message: 'OK', data: todos });
  } catch (e) { next(e); }
}

export async function getTodoById(req, res, next) {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'OK', data: todo });
  } catch (e) { next(e); }
}

export async function updateTodo(req, res, next) {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Updated', data: updated });
  } catch (e) { next(e); }
}

export async function deleteTodo(req, res, next) {
  try {
    const deleted = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json({ message: 'Deleted', data: { id: req.params.id } });
  } catch (e) { next(e); }
}

export async function deleteAllTodos(req, res, next) {
  try {
    const result = await Todo.deleteMany({ user: req.user.id });
    res.json({ message: 'Deleted all', data: { deletedCount: result.deletedCount } });
  } catch (e) { next(e); }
}
