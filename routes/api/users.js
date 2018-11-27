const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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
// @route GET api/users/register
// @desc  register user
// @access Public
router .post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists"})
      } else {
        const avatar = gravatar.url()
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
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
              .catch(err => console.log(err));
          })
        })
      }
    })
  res.json({
    name: req.body.name,
    email: req.body.email,
  })
})
module.exports = router;
