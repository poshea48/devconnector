const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const fetch = require('node-fetch');
// Load Profile Model
const Profile = require('../../models/Profile')
// Load User model
const User = require('../../models/User')
// Load validator
const validateProfileInput = require('../../validation/profile')
const validateEducationInput = require('../../validation/education')
const validateExperienceInput = require('../../validation/experience')
// @route GET api/profile/test
// @desc  Test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}))

// @route GET api/profile
// @desc  get current users profile
// @access Privaate
router.get('/',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
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
        console.log("hello")
        res.json(profile);
      })
      .catch(err => res.json({err: err}));
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
    .catch(err => console.log(err));
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
    .catch(err => console.log(err))
  }
)

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {...req.body}

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    })

  }
)

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {...req.body}

      //Add to education array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    })
  }
)

// @route GET api/profile/repos/:username
// @desc get Github repos
// @public
router.get('/github/:username/', (req, res) => {
  const username = req.params.username
  const clientId = '9db0ace4a76202512a6a';
  const clientSecret = 'bb36a68cdccccf5ea792d6101f2e38e80ec79acc';
  const count = 5;
  const sort = "created: asc";
  fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    .then(res => res.json())
    .then(data => {
      if (this)
      repos = data
      return res.json({repos: data})
    })
    .catch(err => {
      console.log("inside error")
      return res.json({ err: err })
    })
})


// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
