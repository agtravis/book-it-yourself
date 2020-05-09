/* eslint-disable arrow-parens */
"use strict";

const mongoose = require(`mongoose`);
mongoose.Promise = global.Promise;

// 27017 is the default mongoDB port
const uri = `mongodb://localhost:27017/bookityourself`;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log(`Connected to Mongo`);
    },
    err => {
      console.log(`error connecting to Mongo: `);
      console.log(err);
    }
  );

module.exports = mongoose.connection;
