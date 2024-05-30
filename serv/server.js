const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

let todos = [];
let id = 1;

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const todo = {
    id: id++,
    task: req.body.task,
    completed: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === todoId);
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  todo.task = req.body.task !== undefined ? req.body.task : todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  todos = todos.filter(t => t.id !== todoId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
