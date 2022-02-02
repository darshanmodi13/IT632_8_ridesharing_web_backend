const express = require("express");

const router = express.Router();

//controller
const controller = require("../controllers/user.controller");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     success_response:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: The user data.
 *           example: {}
 *         msg:
 *           type: string
 *           description: Success message
 *           example: Success Response
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     validation_response:
 *       type: object
 *       properties:
 *         err:
 *           type: object
 *           description: Error.
 *           example: {}
 *         msg:
 *           type: string
 *           description: Validation error
 *           example: Validation error
 */

/**
 * @swagger
 * /api/user/:
 *   get:
 *     tags : [User]
 *     summary: test User routr
 *     description: test User routr
 *     responses:
 *       200:
 *         description: get user data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/success_response'
 *       404:
 *         description: Not found
 */

router.get("/", controller.testRequest);

module.exports = router;
