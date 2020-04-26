"use strict";

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const classifiedSchema = new Schema({
  type: { type: Object },
  title: { type: String },
  description: { type: String },
  location: { type: String },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  complete: { type: Boolean },
  status: { type: String },
  postedDate: { type: Date, default: Date.now },
});

const Classified = mongoose.model(`Classified`, classifiedSchema);

module.exports = Classified;
