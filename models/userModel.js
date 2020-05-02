"use strict";

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  role: { type: [String] },
  status: { type: String },
  date: { type: Date, default: Date.now },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: `Classified`,
    },
  ],
});

const User = mongoose.model(`User2`, userSchema);

module.exports = User;
