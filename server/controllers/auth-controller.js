const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Hi HOME Page");
  } catch (error) {
    res.status(500).send(error);
  }
};

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      username,
      email,
      phone,
      password,
    });

    await newUser.save();

    const token = await newUser.generateToken();
    console.log("Generated Token:", token);
    const userId = newUser._id.toString();

    console.log(token);
    res.status(201).json({ user: newUser, token, userId });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid email and password" });
    }
  } catch (error) {
    next(error);
  }
};

const user = async (req, res, next) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    next(error);
  }
};

module.exports = { home, register, login, user };
