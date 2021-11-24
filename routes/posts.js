const express = require('express');
const router = express.Router();
const Posts = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

const { forwardAuthenticated, ensureAuthenticated } = require('../helpers/password/auth');

//! Get all posts
router.get('/', ensureAuthenticated, (req, res) => {
  Posts.find({ /* isPublic: true */ })
    .sort({ date: -1 })
    .then(posts => {
      res.send({ posts });
    });
});

//! Create a post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newPost = new Posts({
    title,
    content,
    creator: req.user.id,
  });
  newPost.save().then(post => {
    res.send({ post });
  });
})

//! Get a post by id
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      res.send({ post });
    });
})

//! Update a post
router.put('/:id', (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, req.body)
    .then(post => {
      res.send({ post });
    });
})

//! Delete a post
router.delete('/:id', (req, res) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(post => {
      res.send({ post });
    });
})

//! Update isPublished
router.put('/:id/is-published', (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, req.body)
    .then(post => {
      res.send({ post });
    });
})

//! Post a comment
router.post("/:id/comment", (req, res) => {
  const { content } = req.body;
  const newComment = new Comment({
    content,
    creator: req.user.id,
    post: req.params.id,
  });
  newComment.save().then(comment => {
    res.send({ comment });
  });
  Posts.findById(req.params.id).then(post => {
    post.comments.push(newComment);
    post.save();
  })
})

//! Post a like
router.post("/:id/like", (req, res) => {
  Posts.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    post.likes.push(req.user.id);
    post.save();
    res.send(post);
  })
})

//! Post a dislike
router.post("/:id/dislike", (req, res) => {
  Posts.findById(req.params.id, (err, post) => {
    if (err) {
      res.send(err);
    }
    post.dislikes.push(req.user.id);
    post.save();
    res.send(post);
  })
})

module.exports = router;