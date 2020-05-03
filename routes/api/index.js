/* eslint-disable arrow-parens */
"use strict";

const router = require(`express`).Router();
// const userRoutes = require(`./users`);
const classifiedRoutes = require(`./classifieds`);
const userLogin = require(`./user`);
const User = require(`../../database/models/user`);

// table routes
// router.use(`/users`, userRoutes);
router.use(`/classifieds`, classifiedRoutes);
router.use(`/user`, userLogin);

// returns a list of all users
// api/users
router.get(`/users`, (req, res) => {
  User.find({})
    .sort({ date: -1 })
    .then(dbUsers => {
      console.log(dbUsers);
      res.json(dbUsers);
    })
    .catch(err => res.json(err));
});

// same as above but populates posts array
// api/usersposts
router.get(`/usersposts`, (req, res) => {
  User.find({})
    .populate(`posts`)
    .sort({ date: -1 })
    .then(dbUsers => {
      console.log(dbUsers);
      res.json(dbUsers);
    })
    .catch(err => res.json(err));
});

module.exports = router;
