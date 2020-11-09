const Schema = require("mecore").Mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserModel = {
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
      username: {
        type: String,
      },
      password: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      birthday: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  ),
};

// UserModel.pre("save", function (next) {
//   const user = this;
//   // only hash the password if it has been modified (or is new)
//   if (!user.isModifier("password")) return next();

//   //generate a salt
//   bcrypt.hash(SALT_WORK_FACTOR, (err, salt) => {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, (err, password) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });
// console.log(UserModel);

// UserModel.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

module.exports = UserModel;
