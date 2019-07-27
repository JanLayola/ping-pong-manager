'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares');

/* GET users listing. */
router.get('/tournaments', isNotLoggedIn, (req, res, next) => {
  const data = {
    tournaments: true
  };
  res.render('tournaments', data);
});

module.exports = router;
