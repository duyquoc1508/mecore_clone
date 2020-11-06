const AuthenticationConfig = require("../../config/Authentication");

module.exports = {
  key: AuthenticationConfig.jwtSecretForKey,
  async validate(decoded, request, reply) {
    //console.log("validate -> decoded", decoded);
    if (!decoded.id) {
      return { isValid: false };
    }
    return { isValid: true };
  },
};
