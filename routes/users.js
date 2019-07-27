'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');

/* GET users listing. */
router.get('/:username/tournaments', isNotLoggedIn, async (req, res, next) => {
  try {
    const username = req.params;
    console.log(username);
    const user = await User.findOne(username);
    console.log(user);
    const data = {
      tournaments: true,
      user: user
    };
    res.render('tournaments', data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
