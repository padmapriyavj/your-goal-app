const authService = require('../services/auth.service');

module.exports.signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const result = await authService.signupService({ username, email, password });
    return res.status(201).json({ success: true, message: 'User registered successfully', data: result.user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email or username already exists' });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const result = await authService.loginService(email, password);

    if (!result.success) {
      return res.status(401).json({ success: false, message: result.message });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: result.token,
      user: { id: result.user._id, username: result.user.username, email: result.user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
