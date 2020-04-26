'use strict';

const express = require(`express`);
const mongoose = require(`mongoose`);
const routes = require(`./routes`);
const app = express();
const portNum = 3001;
const PORT = process.env.PORT || portNum;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(`client/build`));
}

app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/bookityourself`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

app.listen(PORT, () =>
  console.log(`API Server up on http://localhost:${PORT}`)
);
