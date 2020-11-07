const UserModule = require("./Module");
const Joi = require("mecore").Joi;

module.exports = [
  {
    method: "POST",
    path: "/users",
    handler: UserModule.createUser,
    options: {
      auth: "Custom",
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

  /**
   * register user with username and password
   */
  {
    method: "POST",
    path: "/users/register",
    handler: UserModule.register,
    options: {
      auth: false,
      tags: ["api", "api-v0"],
      description: "Register user",
      validate: {
        payload: Joi.object({
          username: Joi.string().required().example("username"),
          password: Joi.string().required().example("password"),
        }),
      },
    },
  },

  /**
   * register user with username and password
   */
  {
    method: "POST",
    path: "/users/login",
    handler: UserModule.login,
    options: {
      auth: false,
      tags: ["api", "api-v0"],
      description: "login user",
      validate: {
        payload: Joi.object({
          username: Joi.string().required().example("username"),
          password: Joi.string().required().example("password"),
        }),
      },
    },
  },

  // get user profile
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
