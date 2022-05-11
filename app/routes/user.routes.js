const express = require("express");

const router = express.Router();

//controller
const controller = require("../controllers/user.controller");

router.get("/get/:id", controller.getUser);

router.put("/update/:id", controller.updateUser);

router.post("/upload-docs/:id", controller.uploadDocs);

module.exports = router;
