"use strict";

const router = require(`express`).Router();
// const userRoutes = require(`./users`);
// const classifiedRoutes = require(`./classifieds`);
const userLogin = require(`./user`);

// table routes
// router.use(`/users`, userRoutes);
// router.use(`/classifieds`, classifiedRoutes);
router.use(`/user`, userLogin);

module.exports = router;
