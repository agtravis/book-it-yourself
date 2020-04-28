/* eslint-disable arrow-parens */
"use strict";

/* eslint-disable max-len */
const mongoose = require(`mongoose`);
const db = require(`../models`);

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
    location: `New Jersey`,
    role: [`promoter`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fc`)],
  },
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203cabaa`),
    username: `ryan`,
    password: `ryan`,
    location: `Seattle`,
    role: [`artist`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fd`)],
  },
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203cabab`),
    username: `duc`,
    password: `duc`,
    location: `Belgium`,
    role: [`promoter`, `artist`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fe`)],
  },
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203cabac`),
    username: `remy`,
    password: `remy`,
    location: `Seattle`,
    role: [`promoter`, `artist`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8ff`)],
  },
  {
    _id: mongoose.Types.ObjectId(`5ea863ce84d81942203cabad`),
    username: `george`,
    password: `george`,
    location: `England`,
    role: [`artist`],
    posts: [mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de900`)],
  },
];

const postsSeed = [
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fc`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203caba9`),
    title: `Looking for a show`,
    description: `Looking for a show, any ideas please get in touch!`,
    location: `Seattle`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2020-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fd`),
    type: `showNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabaa`),
    title: `Looking for a band`,
    description: `Looking for a band, any ideas please get in touch!`,
    location: `New York`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2020-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fe`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabab`),
    title: `Looking for a DJ`,
    description: `Looking for a DJ, any ideas please get in touch!`,
    location: `Portland`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2020-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8ff`),
    type: `showNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabac`),
    title: `Looking for a guitar`,
    description: `Looking for a guitar, any ideas please get in touch!`,
    location: `Vancouver`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2020-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de900`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabad`),
    title: `Looking for a place to crash`,
    description: `Looking for a place to crash, any ideas please get in touch!`,
    location: `L.A.`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2020-01-01T00:00:00.000Z`,
  },
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(`${data.result.n} records inserted!`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/bookityourself`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

db.Classified.deleteMany({})
  .then(() => db.Classified.collection.insertMany(postsSeed))
  .then(data => {
    console.log(`${data.result.n} classifieds posted!`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
