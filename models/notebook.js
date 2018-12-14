const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("data/Appartoo.sqlite");

class NotebookModel {
  // create note in notebook
  static create(data, req, res) {

    db.run(
      `INSERT INTO notebook (firstname,lastname,email,familly,address,id_user)
    VALUES('${data.firstname}',
           '${data.lastname}',
           '${data.email}',
           '${data.familly}',
           '${data.address}',
           '${data.id_user}')`,
      (err, row) => {
        if (!row) {
          res.render(`../views/note`, {
            title: 'Notebook',
            err: err,
            id: data.id_user,
            note: data.note
          })
        } else {
          res.render(`../views/note`, {
            title: 'Notebook',
            err: '',
            id: data.id_user,
            note: data.note
          })
        }
      }
    );
  }

  // update a note  after verification id_user and id_notebook
  static update(note, res, id) {
    db.run(
      `UPDATE notebook 
      SET
      firstname = '${note.firstname}',
      lastname = '${note.lastname}',
      email = '${note.email}',
      familly = '${note.familly}',
      address = '${note.address}'
      WHERE id_notebook = '${note.id_notebook}'
      AND id_user = '${note.id_user}' `,
      (err, row) => {

        if (err) res.send(err.message);
        else res.render('../views/note', {
          title: 'Notebook',
          id: note.id_user,
          note
        });


      }
    );
  }

  // delete a note by id
  static deleteNote(id, note, res) {
    db.all(`DELETE  from notebook where id_notebook = ${id}`, (err, row) => {

      if (err) res.send(err.message);
      else res.render('../views/note.ejs', {
        title: 'Notebook',
        note,

      });
    });
  }
  //Get
  static getNote(req, res, id) {

    db.all(`SELECT * from notebook where id_user = ${id}`, (err, row) => {
      if (!row) {
        return res.render('../views/note.ejs', {
          title: "Notebook",
          note: row
        });
      } else {
        res.render('../views/note.ejs', {
          title: 'Notebook',
          note: row,
          id_notebook: row.id_notebook,
          id
        });


      }

    });
  }

  static getInfos(id, req, res) {

    db.get(`SELECT * FROM users WHERE id_user ='${id}'`, (err, row) => {

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

module.exports = NotebookModel;