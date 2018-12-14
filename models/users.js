const sqlite = require("sqlite3");
const db = new sqlite.Database("data/Appartoo.sqlite");

class userModel {

  static create(user, res) {

    db.run(
      `INSERT INTO users (firstname,lastname,email,username,password,age,familly,food,race)
      VALUES('${user.firstname}',
      '${user.lastname}',
      '${user.email}',
      '${user.username}',
      '${user.password}',
      '${user.age}',
      '${user.familly}',
      '${user.food}',
      '${user.race}')`,
      (err, row) => {
        if (err) {
          res.render('../views/index.ejs', {
            title: 'home',
            err: err
          })
        } else {
          res.render('../views/index.ejs', {
            title: 'home',
            err: ''
          })


        }
      }
    );
  }

  static update(user, res) {
    db.run(
      `UPDATE users set
              firstname = '${user.firstname}',
              lastname = '${user.lastname}',
              email = '${user.email}',
              age = '${user.age}',
              familly = '${user.familly}',
              food = '${user.food}',
              race = '${user.race}'
              WHERE id_user = '${user.id}'`,
      err => {

        if (err) res.send(err);
        else res.render('../views/user.ejs', {
          title: 'Notebook'
        });
      }
    );
  }
  static delete(id, res) {
    db.get(`DELETE  from user where id = ${id}`, (err, row) => {
      if (err) res.send(err);
      else res.send(`User has been successfully deleted :{"id" : ${id}`);
    });
  }

  static login(data, req, res) {

    db.get(`SELECT * FROM users WHERE username='${data.username}' AND password='${data.password}'`, (err, row) => {

      if (!row) {
        res.render('../views/index.ejs', {
          title: 'home',
          err: row
        });

      } else {
        const view = {
          Prenom: row.firstname,
          Nom: row.lastname,
          email: row.email,
          age: row.age + ' ans',
          famille: row.familly,
          nourriture: row.food,
          race: row.race,
        };

        res.render('../views/user.ejs', {
          title: 'Notebook',
          row,
          user: view
        });
      }


    });
  }

}

module.exports = userModel;