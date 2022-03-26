const { boolean } = require("joi");
const mongoose = require("mongoose");

const document_schema = new mongoose.Schema({
  driving_licence: {
    type: String,
    required: true,
  },
  rc_book: {
    type: String,
    required: true,
  },
  is_document_verified: {
    type: Boolean,
    required: true,
  },
  licence_number: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    require: true,
  },
  vehicle_no: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("documents", document_schema);
