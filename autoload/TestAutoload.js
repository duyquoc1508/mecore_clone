const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object

// // ioredis supports all Redis commands:
// redis.set("foo", "bar");

// const redis = require("redis");
// const client = redis.createClient();

// client.on("error", function (error) {
//   console.error(error);
// });

// client.set("key", "value", redis.print);

module.exports = {
  isActive: false,
  onLoad: () => {
    const app = require("..").getInstance();
    const logger = app.log4js.getLogger("default");
    logger.info("Test autoload");
    const __ = app.i18n.__;
    console.log(__("Test 1231231"));
  },
};
