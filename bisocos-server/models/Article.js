const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  label: { type: String, required: true },
  desc: { type: String, required: true },
  content: [{ type: String }],
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);