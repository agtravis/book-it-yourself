/* eslint-disable no-magic-numbers */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable object-shorthand */
'use strict';

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const bcrypt = require(`bcryptjs`);
mongoose.promise = Promise;

const userSchema = new Schema({

  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },

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
    console.log(`models/user.js =======NO PASSWORD PROVIDED=======`);
    next();
  } else {
    console.log(`models/user.js hashPassword in pre save`);

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model(`User`, userSchema);
module.exports = User;
