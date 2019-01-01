// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const passport = require('passport');
//
// const Post = require('../../models/Post');
// const Like = require('../../models/Like');
// const Comment = require('../../models/Comment');
//
// // Load validations
// const validatePostInput = require('../../validation/post');
// const validateCommentInput = require('../../validation/comment');
//
// // @route GET api/comments/:post_id
// // @desc  get all comments from a post
// // @access Public
// router.get('/:post_id', (req, res) => {
//   Comment.find({post: req.params.post_id})
//   .then(res => {
//     console.log("hey")
//   })
//   .catch(err => console.log(err))
// })
//
// module.exports = router;
