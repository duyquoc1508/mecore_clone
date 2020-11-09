const Joi = require("mecore").Joi;

const ResponseCode = require("../../../../../config/ResponseCode");

module.exports = [
  {
    method: "POST",
    path: "/v1/test",
    handler(request, reply) {
      const payload = request.payload;
      console.log("credentials", request.auth.credentials);

      return reply
        .api({
          test: request.i18n.__(`Client IP ${request.clientIp}`),
        })
        .code(1000);
    },
    options: {
      // auth: {
      //   strategy: "Default",
      //   payload: false,
      // },
      // auth: "Default",
      validate: {
        payload: Joi.object({
          firstname: Joi.string()
            .min(1)
            .max(20)
            .example("quoc")
            .description("firstname"),
          lastname: Joi.string()
            .min(1)
            .max(20)
            .example("nguyen")
            .description("lastname"),
        }).label("PAYLOAD_TEST"),
      },
      tags: ["api", "internal", "v1"],
      response: {
        status: {
          [ResponseCode.REQUEST_SUCCESS]: Joi.object({
            test: Joi.string(),
          }).label("TEST_SUCCESS"),
        },
      },
    },
  },
  // {
  //   method: "POST",
  //   path: "/v2/test",
  //   handler(request, reply) {
  //     const payload = request.payload;
  //     return reply
  //       .api({
  //         ip: request.i18n.__("Client IP {{clientIp}}", {
  //           clientIp: request.clientIp,
  //         }),
  //       })
  //       .code(1000);
  //   },
  //   options: {
  //     // auth: 'Local',
  //     auth: false,
  //     validate: {
  //       payload: Joi.object({
  //         username: Joi.string()
  //           .min(1)
  //           .max(20)
  //           .example("11")
  //           .description("test"),
  //       }).label("PAYLOAD_TEST"),
  //     },
  //     tags: ["api", "external-v2"],
  //     response: {
  //       status: {
  //         [ResponseCode.REQUEST_SUCCESS]: Joi.object({
  //           ip: Joi.string(),
  //         }).label("TEST_SUCCESS"),
  //       },
  //     },
  //   },
  // },
  // //new
  // {
  //   method: "GET",
  //   path: "/v2/test",
  //   handler(request, reply) {
  //     const payload = request.payload;
  //     return reply
  //       .api({
  //         ip: request.i18n.__("Client IP {{clientIp}}", {
  //           clientIp: request.clientIp,
  //         }),
  //       })
  //       .code(1000);
  //   },
  //   options: {
  //     // auth: 'Local',
  //     validate: {
  //       payload: Joi.object({
  //         username: Joi.string()
  //           .min(1)
  //           .max(20)
  //           .example("11")
  //           .description("test"),
  //       }).label("PAYLOAD_TEST"),
  //     },
  //     tags: ["api", "external-v2"],
  //     response: {
  //       status: {
  //         [ResponseCode.REQUEST_SUCCESS]: Joi.object({
  //           ip: Joi.string(),
  //         }).label("TEST_SUCCESS"),
  //       },
  //     },
  //   },
  // },

  /**
   * @dev for test validate
   */
  {
    method: "POST",
    path: "/test/validate",
    handler(request, reply) {
      const schemaValidator = Joi.object({
        array_unique: Joi.array().unique().max(5), // array with unique value and length array
        alternative_try: Joi.alternatives().try(Joi.string(), Joi.number()), // allow string || number
        string: Joi.string(),
        regex: Joi.string().pattern(new RegExp(".*")),
        //email with allow 2 type extension .com and .net
        email: Joi.string().email({
          minDomainSegments: 2, //
          tlds: { allow: ["com", "net"] },
        }),
        array_number: Joi.array().items(Joi.number()),
        // check array only have one type
        array_one_type: Joi.alternatives().try(
          Joi.array().items(Joi.number()),
          Joi.array().items(Joi.string())
        ),
        alphanum: Joi.string().alphanum(), //[a-zA-Z0-9]
        string_trim: Joi.string().trim(), // default raw data will be converted to trim (no space)
        enum: Joi.string().valid("apple", "banana"), // validate enum type
      });
      // using bellow to check error and value after check
      const { error, value } = schemaValidator.validate({
        array_unique: [1, 2, "string", 4, 5],
        alternative_try: 21321,
        string: "_string*",
        regex: "#21321",
        email: "quo.v.kc@gmail.com", //failure: "quco@gmail.c2om"
        array_number: [1, 2, 3, 2, 5], //failure: [1, 2, "string"]
        array_one_type: ["a", "b", "c", "string", "5"],
        alphanum: "allow string or number",
        string_trim: "       32132    ",
        enum: "apple",
      });
      console.log("handler -> value", value);
      console.log("handler -> error", error);

      // console.log("payload", payload);
      return reply.api({ error });
    },
    options: {
      auth: false,
      tags: ["api", "test-validate"],
    },
  },
];
