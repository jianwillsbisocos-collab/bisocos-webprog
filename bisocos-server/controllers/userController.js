const User = require('../models/User');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    // Ensure the password is included in the request body
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const normalizedBody = {
      ...req.body,
      email: req.body.email?.trim().toLowerCase(),
      username: req.body.username?.trim(),
      isActive: req.body.status ? req.body.status === 'Active' : req.body.isActive,
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the user with the hashed password
    const user = await User.create({ ...normalizedBody, password: hashedPassword });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const normalizedBody = {
      ...req.body,
      email: req.body.email?.trim().toLowerCase(),
      username: req.body.username?.trim(),
      isActive: req.body.status ? req.body.status === 'Active' : req.body.isActive,
    };

    // Check if the password is being updated
    if (normalizedBody.password) {
      // Hash the new password
      normalizedBody.password = await bcrypt.hash(normalizedBody.password, 10);
    }

    // Update the user with the new data
    const user = await User.findByIdAndUpdate(req.params.id, normalizedBody, { new: true });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    const identifier = (req.body.email || req.body.username || '').trim();

    // Allow admins/users to sign in with either email or username.
    const user = await User.findOne(
      identifier.includes('@')
        ? { email: identifier.toLowerCase() }
        : { username: identifier }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
    }

    // Check if the user is a viewer
    if (user.type === 'viewer') {
      // Completely block viewers from logging in
      return res.status(403).json({ message: 'Access Denied' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type }, // Include type in the token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, type: user.type, firstName: user.firstName }); // Include type in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };
