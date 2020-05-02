"use strict";

const router = require(`express`).Router();
const userRoutes = require(`./users`);
const classifiedRoutes = require(`./classifieds`);

// table routes
router.use(`/users`, userRoutes);
router.use(`/classifieds`, classifiedRoutes);

module.exports = router;
