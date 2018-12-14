var {
    Router
} = require('express');
var usersRouter = require('./notebook');
var indexRouter = require('./users');

var api = Router();

api.use('/', indexRouter);
api.use('/note', usersRouter);

module.exports = api;