const UserModule = require("./Module");
const Joi = require("mecore").Joi;

module.exports = [
  {
    method: "POST",
    path: "/users",
    handler: UserModule.createUser,
    options: {
      auth: false,
      tags: ["api", "api-v0"],
      description: "Create a new user",
      validate: {
        payload: Joi.object({
          firstName: Joi.string().required().example("firstname"),
          lastName: Joi.string().required().example("lastname"),
          fullName: Joi.string().required().example("fullName"),
        }),
      },
    },
  },

  {
    method: "GET",
    path: "/users/{userId}",
    handler: UserModule.getUserProfile,
    options: {
      auth: false,
      tags: ["api", "api-v0"],
      description: "Get user profile",
      validate: {
        params: Joi.object({
          userId: Joi.number().required().example(1),
        }),
      },
    },
  },
];
