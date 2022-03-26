const express = require("express");

const router = express.Router();

const auth = require('../middlewares/auth.middleware');
//controller
const controller = require("../controllers/auth.controller");

router.post("/register", /*middleware,*/ controller.register);

router.post("/signin", [auth.isNotLoggedIn], controller.signin);

module.exports = router;
