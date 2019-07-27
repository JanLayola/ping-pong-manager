'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');

/* GET users listing. */
router.get('/:username/tournaments', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);
    const data = {
      tournaments: true,
      user: user
    };
    res.render('tournaments', data);
  } catch (error) {
    next(error);
  }
});

router.get('/profile/:username', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);
    const data = {
      tournaments: true,
      user: user
    };
    res.render('profile/view', data);
  } catch (error) {
    next(error);
  }
});

router.get('/profile/:username/update', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);
    const data = {
      tournaments: true,
      user: user
    };
    res.render('profile/update', data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
