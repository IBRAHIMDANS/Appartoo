const sqlite = require('sqlite3');


const db = new sqlite.Database("data/Appartoo.sqlite");

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS users(id_user INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT,lastname TEXT,email TEXT,username TEXT, password Text, age INTEGER, familly Text,food TEXT,race TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS notebook (id_notebook INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT,lastname TEXT,email TEXT,familly Text,address TEXT,id_user INTEGER,FOREIGN KEY(id_user) REFERENCES users(id_user))");
});

module.exports = {
    db
};