const Schema = require("mecore").Mongoose.Schema;

const Model = {
  connection: "default",
  tableName: "User",
  autoIncrement: {
    id: {
      startAt: 1,
      incrementBy: 1,
    },
  },
  attributes: new Schema(
    {
      lastName: {
        type: String,
      },
      firstName: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  ),
};

module.exports = Model;
