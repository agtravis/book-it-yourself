"use strict";

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const classifiedSchema = new Schema({
  type: { type: String, required: true },
  author: { type: Schema.Types.ObjectId },
  name: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  complete: { type: Boolean, default: false },
  status: { type: String },
  postedDate: { type: Date, default: Date.now },
});

const Classified = mongoose.model(`Classified`, classifiedSchema);

module.exports = Classified;
