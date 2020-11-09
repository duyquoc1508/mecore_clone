const BookModel = require("../../../models/BookModel");
const UserModel = require("../../../models/UserModel");
const ResponseCode = require("../../../config/ResponseCode");

const createBook = async (request, reply) => {
  try {
    // const { authorId } = request.payload;
    // const author = await UserModel.findOne({ id: authorId });
    // if (!author) {
    //   return reply.api({ message: "id author not found" }).code(404);
    // }
    // const authorMongoId = author._id;
    const authorMongoId = request.auth.credentials._id;
    const { name } = request.payload;

    const newBook = await BookModel.create({
      name,
      authorId: authorMongoId,
    }).lean();
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
    const book = await BookModel.findOne({ id: bookId })
      .populate({
        path: "authorId",
        select: "firstName lastName",
      })
      .lean();
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

const deleteBook = async (req, reply) => {
  try {
    const bookId = req.params.bookId;
    const book = await BookModel.findOneAndDelete({ id: bookId }).lean();
    if (!book) {
      return reply
        .api({ message: `Book with id ${bookId} not found` })
        .code(ResponseCode.REQUEST_FAIL);
    }
    return reply
      .api({ message: "Xóa thành công" })
      .code(ResponseCode.REQUEST_SUCCESS);
  } catch (error) {
    return reply.api({ message }).code(ResponseCode.REQUEST_FAIL);
  }
};

module.exports = {
  createBook,
  getBook,
  deleteBook,
};
