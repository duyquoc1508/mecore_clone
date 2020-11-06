const UserModel = require("../../../models/UserModel");

const createUser = async (request, reply) => {
  try {
    const newUser = await UserModel.create(request.payload);
    return reply
      .api({
        newUser,
      })
      .code(201);
  } catch (error) {
    console.log(error);
  }
};

const getUserProfile = async (request, reply) => {
  const { userId } = request.params;
  try {
    const userProfile = await UserModel.findOne({ id: userId });
    if (userProfile) {
      return reply
        .api({
          userProfile,
        })
        .code(200);
    } else {
      return reply
        .api({
          message: `User with id = ${userId} not found`,
        })
        .code(404);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getUserProfile,
};
