const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile')
// Load User model
const User = require('../../models/User')
// Load validator
const validateProfileInput = require('../../validation/profile')

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
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = "Could not find profile for this user";
        return res.status(404).json(errors)
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

// @route GET api/profile/all/
// @desc get all profiles
// @access Public
router.get('/all', (req, res) => {
  const errors = {}

  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if (!profiles) {
      errors.noprofiles = "Could not find any profiles"
      return res.status(404).json(errors)
    }

    res.json(profiles);
  })
  .catch(err => res.status(404).json({profile: "There are no profiles"}))
})
// @route GET api/profile/handle/:handle
// @desc get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc get profile by user_id
// @access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json({profile: "there is no profile for this user"}));
});

// @route POST api/profile
// @desc  create profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid} = validateProfileInput(req.body);
    if(!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    const { handle, skills, youtube, twitter, facebook, linkedin, instagram } = req.body
    const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(','),
      social: { youtube, twitter, facebook, linkedin, instagram }
    };

    Profile.findOne({ user: req.user.id }).then(profile => {
      if(profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          {$set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile))
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if(profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors)
          }
          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile))
        })

      }
    })
  }
)

module.exports = router;
