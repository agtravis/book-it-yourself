/* eslint-disable no-magic-numbers */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable object-shorthand */
"use strict";

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const bcrypt = require(`bcryptjs`);
mongoose.promise = Promise;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, default: `` },
  location: { type: String, default: `` },
  telephone: { type: String, default: `` },
  role: { type: [String] },
  status: { type: String, default: `` },
  date: { type: Date, default: Date.now },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: `Classified`,
    },
  ],
});

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre(`save`, function (next) {
  if (!this.password) {
    console.log(`=======NO PASSWORD PROVIDED=======`);
    next();
  } else {
    console.log(`hashPassword in pre save`);

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model(`User`, userSchema);
module.exports = User;
