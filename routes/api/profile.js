const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile')
// Load User model
const User = require('../../models/User')

// @route GET api/profile/test
// @desc  Test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}))

// @route GET api/profile
// @desc  get current users profile
// @access Privaate
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = "Could not find profile for this user";
        return res.status(404).json(errors)
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

module.exports = router;
