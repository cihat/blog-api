const express = require('express');
const router = express.Router();
const Posts = require('../models/Post');

//! Get all post
router.get("/", (req, res, next) => {
  Posts.find({ isPublic: true })
    .sort({ date: -1 })
    .then(posts => {
      res.send({ posts });
    });
})

module.exports = router;
