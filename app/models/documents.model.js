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
 is_document_verified:{
    type: Boolean,
    required:true,
  },
});

module.exports = mongoose.model("documents", document_schema);