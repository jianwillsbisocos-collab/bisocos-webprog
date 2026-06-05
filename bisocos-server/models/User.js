const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  type: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'editor' },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
