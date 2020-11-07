const AuthenticationConfig = require("../../config/Authentication");
const jwt = require("jsonwebtoken");

module.exports = {
  key: AuthenticationConfig.jwtSecretForCustom,
  async validate(decoded, request, reply) {
    if (!decoded.id) {
      return { isValid: false };
    }
    return { isValid: true };
  },
};
