//responses
const responses = require("../utils/responses");
const Rides = require("../models").Rides
exports.testRequest = (req, res) => {
  return responses.successResponse(res, { msg: "User Routes." });
};
