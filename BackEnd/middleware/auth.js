const Account = require("../models/accounts.model");
const ErrorHander = require("./errorHander");
const jwt = require("jsonwebtoken");
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.data.role)) {
      return next(
        new ErrorHander(
          `Roles: ${req.data.role} is not allowed this resource`,
          403
        )
      );
    }

    next();
  };
};
exports.verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  let jwt_secret = process.env.JWT_SECRET || "mysecret";

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, jwt_secret);


    req.data = decoded.data._id;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
