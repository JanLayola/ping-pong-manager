'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  useFindAndModify: false
});

mongoose.set('useFindAndModify', false);

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: process.env.SECRET_SESSION, // don't push at github!!
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
