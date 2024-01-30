const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { providedEmail, providedUserName, providedPassword } = req.body;

  if (!providedEmail || !providedUserName || !providedPassword) {
    res.status(400);
    throw new Error("all credentials are mandatory");
  }

  const dupliciteEmail = await User.findOne({ email: providedEmail });
  console.log(dupliciteEmail);
  if (dupliciteEmail) {
    res.status(409);
    throw new Error("email already registered");
  }

  const dupliciteUserName = await User.findOne({
    userName: providedUserName,
  });
  if (dupliciteUserName) {
    res.status(409);
    throw new Error("username already registered");
  }

  const hashedPassword = await bcrypt.hash(providedPassword, 10);

  const newUser = await User.create({
    email: providedEmail,
    userName: providedUserName,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      email: newUser.email,
      username: newUser.userName,
      token: getJWT(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("something went wrong during the registration");
  }
});

const authenticateUser = asyncHandler(async (req, res) => {
  const { providedUserName, providedPassword } = req.body;

  if (!providedUserName || !providedPassword) {
    res.status(400);
    throw new Error("all credentials are mandatory");
  }

  const foundUser = await User.findOne({ userName: providedUserName });

  if (!foundUser) {
    res.status(400);
    throw new Error("invalid credentials");
  }

  const authorizedLogin = await bcrypt.compare(
    providedPassword,
    foundUser.password
  );

  if (authorizedLogin) {
    res.json({
      _id: foundUser.id,
      email: foundUser.email,
      username: foundUser.userName,
      token: getJWT(foundUser._id),
    });
  } else {
    res.status(409);
    throw new Error("invalid credentials");
  }
});

const getUserData = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const getJWT = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, authenticateUser, getUserData };
