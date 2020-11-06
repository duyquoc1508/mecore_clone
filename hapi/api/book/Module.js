const BookModel = require("project/models/BookModel");
const UserModel = require("project/models/UserModel");

const createBook = async (request, reply) => {
  try {
    const { authorId } = request.payload;
    const author = await UserModel.findOne({ id: authorId });
    if (!author) {
      return reply.api({ message: "id author not found" }).code(404);
    }
    const authorMongoId = author._id;
    const { name } = request.payload;

    const newBook = await BookModel.create({ name, authorId: authorMongoId });
    return reply
      .api({
        newBook,
      })
      .code(201);
  } catch (error) {
    console.log(error);
  }
};

const getBook = async (request, reply) => {
  try {
    const { bookId } = request.params;
    const book = await BookModel.findOne({ id: bookId }).populate({
      path: "authorId",
      select: "firstName lastName",
    });
    if (!book) {
      return reply
        .api({ message: `Book with id = ${bookId} not found` })
        .code(404);
    }
    return reply.api({ book });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBook,
  getBook,
};
