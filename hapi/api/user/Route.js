const UserModule = require("./Module");
const Joi = require("mecore").Joi;
const ResponseCode = require("../../../config/ResponseCode");

module.exports = [
  /**
   * create new user with firstname, lastname, fullname
   */
  {
    method: "POST",
    path: "/users",
    handler: UserModule.createUser,
    options: {
      auth: false,
      tags: ["api", "user"],
      description: "Create a new user",
      validate: {
        payload: Joi.object({
          firstName: Joi.string().required().example("firstname"),
          lastName: Joi.string().required().example("lastname"),
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
      tags: ["api", "user"],
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
      tags: ["api", "user"],
      description: "login user",
      validate: {
        payload: Joi.object({
          username: Joi.string().required().example("username"),
          password: Joi.string().required().example("password"),
        }),
      },
      response: {
        status: {
          [ResponseCode.REQUEST_SUCCESS]: Joi.object({
            token: Joi.string(),
            message: Joi.string(),
          }),
          [ResponseCode.REQUEST_FAIL]: Joi.object({
            message: Joi.string(),
          }),
        },
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
      tags: ["api", "user"],
      description: "Get user profile",
      validate: {
        params: Joi.object({
          userId: Joi.number().required().example(1),
        }),
      },
    },
  },

  // get user profile (own of token)
  {
    method: "GET",
    path: "/users/me",
    handler: UserModule.getOwnProfileInfo,
    options: {
      auth: {
        strategy: "Custom",
        payload: true,
      },
      tags: ["api", "user"],
      description: "Get own profile info",
      // validate: {
      //   params: Joi.object({
      //     userId: Joi.number().required().example(1),
      //   }),
      // },
    },
  },

  // update user profile
  {
    method: "PUT",
    path: "/users",
    handler: UserModule.updateUserProfile,
    options: {
      auth: {
        strategy: "Custom",
      },
      tags: ["api", "user"],
      description: "Update user profile",
      validate: {
        payload: Joi.object({
          firstName: Joi.string(),
          lastName: Joi.string().allow(null, ""),
          birthday: Joi.date().allow(null),
        }),
      },
    },
  },
];
