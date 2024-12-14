const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.signupService = async (userDetails) => {
  try {
    const user = new User(userDetails);
    await user.save();
    return { success: true, user };
  } catch (error) {
    console.error('Error in signupService:', error);
    throw error;
  }
};

module.exports.loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { success: false, message: 'Invalid email or password' };
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { success: true, token, user };
  } catch (error) {
    console.error('Error in loginService:', error);
    throw error;
  }
};
