/* eslint-disable arrow-parens */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable curly */
/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
"use strict";

const express = require(`express`);
const router = express.Router();
const User = require(`../../database/models/user`);
const passport = require(`../../passport`);
const mongoose = require(`mongoose`);

router.post(`/`, (req, res) => {
  console.log(`user signup`);

  const { username, password } = req.body;
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log(`User.js post error: `, err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
    } else {
      const newUser = new User({
        username: username,
        password: password,
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post(
  `/login`,
  function (req, res, next) {
    console.log(`routes/user.js, login, req.body: `);
    console.log(req.body);
    next();
  },
  passport.authenticate(`local`),
  (req, res) => {
    console.log(`logged in`, req.user);
    var userInfo = {
      username: req.user.username,
      id: req.user._id,
    };
    res.send(userInfo);
  }
);

router.get(`/`, (req, res, next) => {
  console.log(`===== user!!======`);
  // console.log(req.user);
  if (req.user) {
    console.log(req.user);
    res.json({ user: req.user });
  } else {
    console.log(`no user`);
    res.json({ user: null });
  }
});

router.post(`/logout`, (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: `logging out` });
  } else {
    res.send({ msg: `no user to log out` });
  }
});

// gets one user, fills posts array with posts
// api/user/:id
router.get(`/:id`, (req, res) => {
  User.findById(req.params.id)
    .populate(`posts`)
    .sort({ date: -1 })
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
});

// updates one user
// api/user/:id
router.put(`/:id`, (req, res) => {
  User.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body, {
    useFindAndModify: false,
  })
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
});

// deletes one user
// api/user/:id
router.delete(`/:id`, (req, res) => {
  User.findById({ _id: mongoose.Types.ObjectId(req.params.id) })
    .populate(`posts`)
    .then(dbUser => dbUser.remove())
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
});

// when a post is created, use this to push it to the array
// the object passed looks like { id: [_id#] }
// api/user/post/:id
// the id in req.params is the user ID, the ID in the body is the post ID
router.put(`/post/:id`, (req, res) => {
  User.updateOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
      $push: { posts: req.body.id },
    }
  )
    .populate(`posts`)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
});

// when a post is deleted, use this to pull it from the array
// the object passed looks like { id: [_id#] }
// api/user/pull/:id
// the id in req.params is the user ID, the ID in the body is the post ID
router.put(`/pull/:id`, (req, res) => {
  User.updateOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
      $pull: { posts: mongoose.Types.ObjectId(req.body.id) },
    }
  )
    .populate(`posts`)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.json(err));
});

module.exports = router;
