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

const postsSeed = [
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fc`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203caba9`),
    name: `frantz`,
    title: `Looking for a show`,
    description: `Looking for a show, any ideas please get in touch!`,
    location: `Seattle`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fd`),
    type: `showNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabaa`),
    name: `ryan`,
    title: `Looking for a band`,
    description: `Looking for a band, any ideas please get in touch!`,
    location: `New York`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fe`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabab`),
    name: `duc`,
    title: `Looking for a DJ`,
    description: `Looking for a DJ, any ideas please get in touch!`,
    location: `Portland`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8ff`),
    type: `showNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabac`),
    name: `remy`,
    title: `Looking for a guitar`,
    description: `Looking for a guitar, any ideas please get in touch!`,
    location: `Vancouver`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de900`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabad`),
    name: `george`,
    title: `Looking for a place to crash`,
    description: `Looking for a place to crash, any ideas please get in touch!`,
    location: `L.A.`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
];

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
