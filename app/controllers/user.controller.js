//responses
const responses = require("../utils/responses");
const cloudinary = require("cloudinary").v2;
let streamifier = require("streamifier");
//model
const Rides = require("../models").Rides;
const User = require("../models").User;
const Documents = require("../models").documents;

exports.getUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return responses.badRequestResponse(res, { err: "Provide User ID." });
    }
    let user = await User.findById(req.params.id);
    if (!user) return responses.unauthorizedResponse(res, "Not valid User ID.");
    return responses.successResponse(res, user);
  } catch (error) {
    return responses.serverErrorResponse(res);
  }
};

exports.updateUser = async (req, res) => {};

exports.uploadDocs = async (req, res) => {
  try {
    if (!req.params.id) return responses.unauthorizedResponse(res);

    let user = await User.findOne({ _id: req.params.id });
    if (!user) return responses.unauthorizedResponse(res);

    try {
      const rc_img = Buffer.from(req.body.rc_img, "base64");
      let url = await new Promise(async (resolve, reject) => {
        await cloudinary.uploader
          .upload_stream({ format: "jpg" }, (err, res) => {
            if (err) {
              return responses.serverErrorResponse(
                res,
                "RC image upload error"
              );
            } else {
              resolve(res.url);
              // filteredBody.photo = result.url;
            }
          })
          .end(rc_img);
      });
      req.body.rc_img = url;
    } catch (error) {
      console.log(error);
      return responses.serverErrorResponse(res, "RC image upload error");
    }
    try {
      const dl_img = Buffer.from(req.body.dl_img, "base64");
      let url = await new Promise(async (resolve, reject) => {
        await cloudinary.uploader
          .upload_stream({ format: "jpg" }, (err, res) => {
            if (err) {
              return responses.serverErrorResponse(
                res,
                "dl image upload error"
              );
            } else {
              resolve(res.url);
              // filteredBody.photo = result.url;
            }
          })
          .end(dl_img);
      });
      req.body.dl_img = url;
    } catch (error) {
      console.log(error);
      return responses.serverErrorResponse(res, "DL image upload error");
    }

    let new_doc = await new Documents({
      ...req.body,
      is_document_verified: true,
    });
    new_doc.save();

    if (!new_doc) return responses.serverErrorResponse(res);
    return responses.successfullyCreatedResponse(res, new_doc);
    return res.send("data get successfully..");
  } catch (error) {
    return responses.serverErrorResponse(res);
  }
};
