const UserModel = require("../../../models/UserModel");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const AuthenticationConfig = require("../../../config/Authentication");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const ResponseCode = require("../../../config/ResponseCode");

const register = async (request, reply) => {
  try {
    const user = request.payload;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    const newUser = await UserModel.create(user).lean();
    return reply.api({ user: newUser });
  } catch (error) {
    return reply.api({
      error,
    });
  }
};

const login = async (request, reply) => {
  try {
    const userCandidate = request.payload;
    const user = await UserModel.findOne({
      username: userCandidate.username,
    }).lean();
    if (!user) {
      return reply
        .api({
          message: "username not found",
        })
        .code(404);
    }
    const isPasswordMatch = await bcrypt.compare(
      userCandidate.password,
      user.password
    );
    if (!isPasswordMatch) return reply.api({ message: "password failure" });
    // create token
    const payload = {
      username: user.username,
      _id: user._id,
      id: user.id,
    };
    const token = jwt.sign(payload, AuthenticationConfig.jwtSecretForCustom);
    return reply.api({
      message: "login thành công",
      token,
    });
  } catch (error) {
    return reply.api({ message: error });
  }
};

const createUser = async (request, reply) => {
  try {
    const newUser = await UserModel.create(request.payload);
    console.log("request.payload", request.payload);
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
    const userProfile = await UserModel.findOne({ id: userId }).lean();
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

/**
 * get own profile information
 */
const getOwnProfileInfo = async (request, reply) => {
  try {
    console.log(request.auth);
    const userId = request.auth.credentials._id;
    const userProfile = await UserModel.findById(userId).lean();
    if (!userProfile) {
      return reply.api({ message: "user not found." }).code(404);
    }
    return reply.api({ userProfile }).code(200);
  } catch (error) {
    return reply.api({ error });
  }
};

/**
 * update user profile
 */
const updateUserProfile = async (request, reply) => {
  try {
    const userId = request.auth.credentials._id;
    //using {new: true} with operator findByIdAndUpdate to return data after update
    const newProfile = await UserModel.findByIdAndUpdate(
      userId,
      request.payload,
      { new: true }
    ).lean();
    return reply
      .api({ message: "Cập nhật thành công", newProfile })
      .code(ResponseCode.UPDATE_SUCCESS);
  } catch (error) {
    return reply.api({ error });
  }
};

module.exports = {
  createUser,
  getUserProfile,
  register,
  login,
  getOwnProfileInfo,
  updateUserProfile,
};
