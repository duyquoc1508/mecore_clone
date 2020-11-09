const BookModule = require("./Module");
const Joi = require("mecore").Joi;
const ResponseCode = require("../../../config/ResponseCode");

module.exports = [
  {
    method: "POST",
    path: "/api/books",
    handler: BookModule.createBook,
    options: {
      auth: { strategy: "Custom" },
      description: "Create a new book",
      tags: ["api", "book"],
      validate: {
        payload: Joi.object({
          name: Joi.string().required().example("clean code"),
          authorId: Joi.string().required().example("1"),
        }),
      },
    },
  },

  {
    method: "GET",
    path: "/books/{bookId}",
    handler: BookModule.getBook,
    options: {
      auth: false,
      tags: ["api", "book"],
      description: "Get book information",
      validate: {
        params: Joi.object({
          bookId: Joi.string().required().example("5fa4d30243f8373b84e20ccb"),
        }),
      },
    },
  },

  {
    method: "DELETE",
    path: "/api/books/{bookId}",
    handler: BookModule.deleteBook,
    options: {
      auth: "Custom",
      description: "Xóa sách",
      tags: ["api", "book"],
      validate: {
        params: Joi.object({
          bookId: Joi.number().required(),
        }),
      },
      response: {
        status: {
          [ResponseCode.REQUEST_SUCCESS]: Joi.object({
            message: Joi.string().description("Delete success"),
          }),
          [ResponseCode.REQUEST_FAIL]: Joi.object({
            message: Joi.string().description("Delete fail"),
          }),
        },
      },
    },
  },
];
