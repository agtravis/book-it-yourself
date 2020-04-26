"use strict";

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  location: { type: String },
  role: { type: Object },
  status: { type: String },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model(`User`, userSchema);

module.exports = User;
