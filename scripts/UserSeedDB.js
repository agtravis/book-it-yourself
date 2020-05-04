/* eslint-disable arrow-parens */
"use strict";

/* eslint-disable max-len */
const mongoose = require(`mongoose`);
const User = require(`../database/models/user`);

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/bookityourself`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const userSeed = [
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203caba9`),
    username: `frantz`,
    password: `frantz`,
    email: `fake@notreal.com`,
    location: `New Jersey`,
    telephone: `(206) 555-1234`,
    role: [`promoter`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fc`)],
  },
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203cabaa`),
    username: `ryan`,
    password: `ryan`,
    email: `fake@notreal.com`,
    location: `Seattle`,
    telephone: `(206) 555-1234`,
    role: [`artist`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fd`)],
  },
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203cabab`),
    username: `duc`,
    password: `duc`,
    email: `fake@notreal.com`,
    location: `Belgium`,
    telephone: `(206) 555-1234`,
    role: [`promoter`, `artist`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fe`)],
  },
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203cabac`),
    username: `remy`,
    password: `remy`,
    email: `fake@notreal.com`,
    location: `Seattle`,
    telephone: `(206) 555-1234`,
    role: [`promoter`, `artist`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8ff`)],
  },
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203cabad`),
    username: `george`,
    password: `george`,
    email: `fake@notreal.com`,
    location: `England`,
    telephone: `(206) 555-1234`,
    role: [`artist`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de900`)],
  },
];

User.deleteMany({})
  .then(() => User.collection.insertMany(userSeed))
  .then(data => {
    console.log(`${data.result.n} records inserted!`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
