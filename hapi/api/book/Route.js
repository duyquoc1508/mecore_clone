const BookModule = require("./Module");
const Joi = require("mecore").Joi;

module.exports = [
  {
    method: "POST",
    path: "/books",
    handler: BookModule.createBook,
    options: {
      auth: false,
      description: "Create a new book",
      tags: ["api"],
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
      tags: ["api"],
      description: "Get book information",
      validate: {
        params: Joi.object({
          bookId: Joi.string().required().example("5fa4d30243f8373b84e20ccb"),
        }),
      },
    },
  },
];
