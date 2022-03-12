const express = require("express");

const router = express.Router();

//controller
const controller = require("../controllers/auth.controller");

router.post("/register", /*middleware,*/ controller.register);

router.post("/signin", /*middleware,*/ controller.signin);

module.exports = router;
