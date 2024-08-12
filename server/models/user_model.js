const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
});

// Secure password using bcrypt method
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Generate JSON Web Token
userSchema.methods.generateToken = function () {
  const payload = {
    userId: this._id,
    email: this.email,
    isAdmin: this.isAdmin,
  };
  // console.log("for token generation  ", jwt.sign(payload, process.env.JWTMYTOKEN, { expiresIn: '1h' }))

  return jwt.sign(payload, process.env.JWTMYTOKEN, { expiresIn: '1h' });
};

// Create models and collections
const User = mongoose.model("User", userSchema);

module.exports = User;
