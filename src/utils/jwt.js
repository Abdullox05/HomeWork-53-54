const jwt = require("jsonwebtoken");

const config = require("../../config");

const sign = (payload) => jwt.sign(payload, config.jwt_secret_key, {expiresIn: "1h"});

const verify = (payload, callback) => jwt.verify(payload, config.jwt_secret_key, callback);

module.exports = {sign,verify};
