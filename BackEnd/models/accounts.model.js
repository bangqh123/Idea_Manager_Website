const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = new mongoose.Schema(
  {
    email: String,
    password: String,
    username: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next()
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const Account = mongoose.model("Account", schema)

module.exports = Account;
