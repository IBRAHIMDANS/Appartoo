const {
    Router
} = require('express');
const usersRouter = require('./notebook');
const indexRouter = require('./users');

const api = Router();

api.use('/', indexRouter);
api.use('/note', usersRouter);

module.exports = api;