'use strict';

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect(`/users/${req.session.currentUser.username}/tournaments`);
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isFormFilled = (req, res, next) => {
  const { username, password, email, country, city } = req.body;

  if (!username || !password || email || country || city) {
    req.flash('errorFormNotFilled', 'All fields are required');
    return res.redirect(req.originalUrl);
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isFormFilled
};
