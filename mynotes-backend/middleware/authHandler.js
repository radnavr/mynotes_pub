require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authHandler = asyncHandler(async (req, res, next) => {
  let jwtToBeVerified;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      jwtToBeVerified = req.headers.authorization.split(" ")[1];

      const jwtDecoded = jwt.verify(
        jwtToBeVerified,
        process.env.ACCESS_TOKEN_SECRET
      );

      req.user = await User.findById(jwtDecoded.id);
      next();
    } catch (error) {
      res.status(403);
      throw new Error("access not authorized");
    }
  }

  if (!jwtToBeVerified) {
    res.status(401);
    throw new Error("access token missing");
  }
});

module.exports = authHandler;
