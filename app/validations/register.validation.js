const joi = require("joi");

module.exports = (user) => {
  const registerValidation = joi
    .object({
      name: joi.string().required(),
      password: joi.string().required(),
      email: joi.string().email().required(),
      mobile_no: joi.number().required(),
    })
    .options({ abortEarly: true });
  return registerValidation.validate(user);
};
