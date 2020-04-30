/* eslint-disable arrow-parens */
"use strict";

const mongoose = require(`mongoose`);
const UserModel = require(`../models/userModel`);

const userData = {
  username: `george`,
  password: `george`,
  location: `Seattle`,
  role: [`artist`, `promoter`],
  status: ``,
  posts: [],
};

describe(`User model test`, () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  it(`create and save user succesfully`, async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.location).toBe(userData.location);
    expect(savedUser.role[0]).toBe(userData.role[0]);
    expect(savedUser.status).toBe(userData.status);
    expect(savedUser.posts.length).toBe(userData.posts.length);
  });

  it(`insert user successfully, but the field not defined in schema should be undefined`, async () => {
    const userWithInvalidField = new UserModel({
      username: `frantz`,
      password: `frantz`,
      location: `Seattle`,
      role: [`artist`, `promoter`],
      status: ``,
      posts: [],
      address: `123 Fake St`,
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.address).toBeUndefined();
  });

  it(`create user without required field should fail`, async () => {
    const userWithoutRequiredField = new UserModel({
      username: `duc`,
      location: `Seattle`,
      role: [`artist`, `promoter`],
      status: ``,
      posts: [],
    });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      error = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
  });
});
