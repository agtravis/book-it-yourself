/* eslint-disable max-len */
const mongoose = require(`mongoose`);
const db = require(`../models`);

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/googlebooks`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookSeed = [
  {
    title: `Frankenstein`,
    authors: [`Mary Shelley`],
    description: `Tells the story of a scientist who discovers the secret of generating life from lifeless matter, and puts this knowledge to use by creating a monster being`,
    link: `http://books.google.com/books?id=MwkYUxyipDwC&dq=intitle:frankenstein&hl=&source=gbs_api`,
    image: `http://books.google.com/books/content?id=MwkYUxyipDwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`,
  },
];

db.Book.deleteMany({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then((data) => {
    console.log(`${data.result.n} records inserted!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
