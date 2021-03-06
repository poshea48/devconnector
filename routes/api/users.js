const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route GET api/users/test
// @desc  Test users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}))

// @route GET api/users/
// @desc list of all users
// @access Public
router.get("/", (req, res) => {
  let users = {};

  User.find({}, (err, user) => users[user._id] = user)
  res.status(200).send(users);

})
// @route POST api/users/register
// @desc  register user
// @access Public
router .post('/register', (req, res) => {
  // from
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(`Error occured while trying to save user: ${err}`));
        })
      })
    }
  });
});

// @route GET api/users/login
// @desc Login user / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  // from validation/login.js
  const { errors, isValid } = validateLoginInput(req.body)
  // Check Validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  // Find user by email
  User.findOne({email})
  .then(user => {
    // Check for user
    if (!user) {
      errors.login = "Incorrect user/password combination"
      return res.status(404).json(errors)
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch) {
        // create jwt payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar }

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        )
      } else {
        errors.login = "Incorrect user/password combination"
        return res.status(400).json(errors);
      }
    })
  .catch(err => console.log(err))
  });
})

// @route GET api/users/current
// @desc return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  }
)

// @route GET api/users/:user_id
// @desc get user from id
// @access Public
router.get('/:user_id', (req, res) => {
  User.findById(req.params.user_id)
    .then(user => {
      return res.json(user)
    })
    .catch(err => console.log(err))
})
module.exports = router;
