"use strict";

const db = require(`../models`);
const mongoose = require(`mongoose`);

const errorResponseCode = 422;

module.exports = {
  findAll: (req, res) => {
    db.User.find(req.query)
      .populate(`posts`)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  findById: (req, res) => {
    db.User.findById(req.params.id)
      .populate(`posts`)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  create: (req, res) => {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  update: (req, res) => {
    db.User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      req.body,
      { useFindAndModify: false }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  updateNewPost: (req, res) => {
    db.User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $push: { posts: req.body.id },
      }
    )
      .populate(`posts`)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  removePostFromUser: (req, res) => {
    db.User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $pull: { posts: mongoose.Types.ObjectId(req.body.id) },
      }
    )
      .populate(`posts`)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  remove: (req, res) => {
    db.User.findById({ _id: req.params.id })
      .populate(`posts`)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(errorResponseCode).json(err));
  },
};
