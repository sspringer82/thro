const model = require('./model');

module.exports = {
  async create(req, res) {
    const todo = req.body;
    const newTodo = await model.create(todo);
    res.status(201).json(newTodo);
  },
  async getAll(req, res) {
    res.json(await model.getAll());
  },
  async getOne(req, res) {
    res.json(await model.getOne(parseInt(req.params.id, 10)));
  },
  async update(req, res) {
    const id = parseInt(req.params.id, 10);
    const updatedTodo = await model.update(id, req.body);
    res.json(updatedTodo);
  },
  async delete(req, res) {
    await model.delete(parseInt(req.params.id, 10));
    res.status(204).end();
  },
};
