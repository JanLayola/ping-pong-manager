'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  const data = {
    login: true
  };
  res.render('index', data);
});

module.exports = router;
