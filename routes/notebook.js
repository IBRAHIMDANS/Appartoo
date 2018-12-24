const express = require('express');
const router = express.Router();

const NotebookModel = require('../models/notebook');

// Get Note by ID
 router.get('/:id', function (req, res, next) {
    const id = req.params.id
    NotebookModel.getNote(req, res, id)
  })

  //back info
  .get('/infos/:id', function (req, res, next) {
    const id = req.params.id

    NotebookModel.getInfos(id, req, res);
  })
  //Add User
  .post('/adduser', function (req, res, next) {
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      familly: req.body.familly,
      address: req.body.address,
      id_user: req.body.id_user,
      note: req.body.note,
    };

    NotebookModel.create(data, req, res);
  })

  // Update a note
  .put('/update', function (req, res, next) {
    const data = {
      id: req.body.id_notebook,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      familly: req.body.familly,
      adress: req.body.address,
      id_user: req.body.id_user,
    }
 
    NotebookModel.update(data, res);
  })

  // Delete Note by Id
  .delete('/del', function (req, res, next) {
    const id = req.body.id_notebook
    const note = req.body.note

    NotebookModel.deleteNote(id, note, res);
  });

module.exports = router;


///try redirect for fix a bug !!!!