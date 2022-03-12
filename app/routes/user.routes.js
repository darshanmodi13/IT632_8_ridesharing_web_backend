const express = require("express");

const router = express.Router();

//controller
const controller = require("../controllers/user.controller");

router.get("/", controller.testRequest);

module.exports = router;
