var express = require('express');
var router = express.Router();

const userModel = require('../models/users');

// Page home
router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'home',
      err: ""
    });
  })
  // page Inscription
  .get('/inscription', function (req, res, next) {
    res.render('inscription', {
      title: 'inscription'
    });
  })

  // Connexion 
  .post('/Connexion', function (req, res, next) {
    const data = {
      username: req.body.username,
      password: req.body.password,
    }
    userModel.login(data, req, res);

  })
  // Creation de l'utilisateur
  .post('/inscription', function (req, res, next) {
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      age: req.body.age,
      familly: req.body.familly,
      food: req.body.food,
      race: req.body.race,
    }
    userModel.create(data, res);
  })
  // Modification de l'utilisateur
  .put('/user', function (req, res, next) {
    const data = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      age: req.body.age,
      familly: req.body.familly,
      food: req.body.food,
      race: req.body.race,
    }

    userModel.update(data, res);
  })

module.exports = router;