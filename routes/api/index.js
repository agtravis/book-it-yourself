"use strict";

const router = require(`express`).Router();
const userRoutes = require(`./users`);
const user = require(`./user`);
const classifiedRoutes = require(`./classifieds`);

// table routes
router.use(`/user`, user);
router.use(`/users`, userRoutes);
router.use(`/classifieds`, classifiedRoutes);

module.exports = router;
