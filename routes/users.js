var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../helpers/password/auth');
const User = require("../models/User")


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//! SignUp Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

//! Signup
router.post('/signup', (req, res) => {
  const { username, email, password, birthDate } = req.body;
  User.findOne({ username }).then(user => {
    if (user) {
      res.render('signup', {
        username,
        password,
      });
    } else {
      const newUser = new User({
        username,
        password,
        email,
        birthDate,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.redirect('/login');
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//! Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

//* Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/login',
  })(req, res, next);
});

//* Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
