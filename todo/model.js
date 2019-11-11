let todos = [{ id: 1, title: 'get up', done: false }];

module.exports = {
  create(todo) {
    const newTodo = { ...todo, id: Math.max(...todos.map(t => t.id)) + 1 };
    todos.push(newTodo);
    return Promise.resolve(newTodo);
  },
  getAll() {
    return Promise.resolve(todos);
  },
  getOne(id) {
    const todo = todos.find(t => t.id === id);
    return Promise.resolve(todo);
  },
  update(id, todo) {
    const index = todos.findIndex(t => t.id === id);
    todos[index] = { ...todos[index], ...req.body };
    return Promise.resolve(todos[index]);
  },
  delete(id) {
    todos = todos.filter(t => t.id !== id);
    Promise.resolve();
  },
};
