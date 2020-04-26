"use strict";

const db = require(`../models`);

const errorResponseCode = 422;

module.exports = {
  findAll: (req, res) => {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  findById: (req, res) => {
    db.User.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  create: (req, res) => {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  update: (req, res) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      useFindAndModify: false,
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  remove: (req, res) => {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
};
