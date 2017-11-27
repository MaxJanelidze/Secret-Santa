const Joi = require('joi');
// Sign up body validate
module.exports.signup = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      // confirmationPassword: Joi.any().valid(Joy.ref('password'))
    })
  }
};
// Sign in body validate
module.exports.login = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
};