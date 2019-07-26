'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares');

/* GET users listing. */
router.get('/dashboard', isNotLoggedIn, (req, res, next) => {
  res.render('dashboard');
});

module.exports = router;
