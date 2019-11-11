let todos = [{ id: 1, title: 'get up', done: false }];
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data.sqlite3');
module.exports = {
  create(todo) {
    const cols = Object.keys(todo)
      .map(k => `${k} = ?`)
      .join(',');

    return new Promise((res, rej) => {
      db.run(
        `INSERT INTO todo (${cols}) VALUES (${new Array(cols.length)
          .fill('?')
          .join(',')})`,
        [...Object.values(todo)],
        function(err, rows) {
          if (err) {
            rej(err);
          }
          res(rows);
        }
      );
    });

    const newTodo = { ...todo, id: Math.max(...todos.map(t => t.id)) + 1 };
    todos.push(newTodo);
    return Promise.resolve(newTodo);
  },
  getAll() {
    return new Promise((res, rej) => {
      db.all('SELECT * FROM todo', (err, rows) => {
        if (err) {
          rej(err);
        }
        res(rows);
      });
    });
  },
  getOne(id) {
    return new Promise((res, rej) => {
      db.get('SELECT * FROM todo WHERE id = ?', [id], (err, rows) => {
        if (err) {
          rej(err);
        }
        res(rows);
      });
    });
  },
  update(id, todo) {
    const updated = todo;
    const cols = Object.keys(updated)
      .map(k => `${k} = ?`)
      .join(',');

    return new Promise((res, rej) => {
      db.run(
        `UPDATE todo SET ${cols} WHERE id = ?`,
        [...Object.values(updated), id],
        async (err, rows) => {
          if (err) {
            rej(err);
          }
          res(await this.getOne(id));
        }
      );
    });
  },
  delete(id) {
    return new Promise((res, rej) => {
      db.run('DELETE FROM todo WHERE id = ?', [id], (err, rows) => {
        if (err) {
          rej(err);
        }
        res(rows);
      });
    });
  },
};
