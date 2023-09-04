const Joi = require("joi");

const sign_up_validation = async (payload) => {
  const schema = Joi.object({
    first_name: Joi.string().max(32).required(),
    last_name: Joi.string().max(32).required(),
    phone: Joi.string().pattern(/^\+[0-9]{12}$/).required(),
    email: Joi.string().email().max(64).required(),
    password: Joi.string().max(64).required(),
    file: Joi.required(),
  });

  const {error} = schema.validate(payload);

  if (error) {
    return error;
  }else {
    return false;
  };
};

const sign_in_validation = async (payload) => {
  const schema = Joi.object({
    email: Joi.string().email().max(64).required(),
    password: Joi.string(64).required(),
  });
  
  const {error} = schema.validate(payload);
  
  if (error) {
    return error;
  }else {
    return false;
  };
};

module.exports = {sign_up_validation, sign_in_validation};
