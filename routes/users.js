'use strict';

const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares');

/* GET users listing. */
router.get('/private', isNotLoggedIn, (req, res, next) => {
  res.render('private');
});

module.exports = router;
