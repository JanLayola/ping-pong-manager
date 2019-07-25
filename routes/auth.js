'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares');

const router = express.Router();
const saltRounds = 10;

router.get('/signup', isLoggedIn, (req, res, next) => {
  res.render('signup');
});

router.post('/signup', isLoggedIn, isFormFilled, async (req, res, next) => {
  try {
    const { username, password, email, city, country } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.findOne({ username });
    if (user) {
      return res.redirect('../users/private');
    }

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      city,
      country
    });

    req.session.currentUser = newUser;
    res.redirect('../users/private');
  } catch (error) {
    next(error);
  }
});

router.post('/login', isLoggedIn, isFormFilled, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/auth/login');
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('../users/private');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser;
  return res.redirect('/auth/login');
});

module.exports = router;
