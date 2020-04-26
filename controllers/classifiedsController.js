"use strict";

const db = require(`../models`);

const errorResponseCode = 422;

module.exports = {
  findAll: (req, res) => {
    db.Classified.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  findById: (req, res) => {
    db.Classified.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  create: (req, res) => {
    db.Classified.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  update: (req, res) => {
    db.Classified.findOneAndUpdate({ _id: req.params.id }, req.body, {
      useFindAndModify: false,
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  remove: (req, res) => {
    db.Classified.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
};
