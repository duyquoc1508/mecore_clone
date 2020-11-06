const Schema = require("mecore").Mongoose.Schema;

const BookModel = {
  connection: "default",
  tableName: "Book",
  autoIncrement: {
    id: {
      startAt: 1,
      incrementBy: 1,
    },
  },
  attributes: new Schema({
    name: {
      type: String,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  }),
};

module.exports = BookModel;
