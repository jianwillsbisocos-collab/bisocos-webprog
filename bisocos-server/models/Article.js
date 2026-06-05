const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  label: { type: String, default: '' },
  desc: { type: String, default: '' },
  author: { type: String, default: '' },
  category: { type: String, default: '' },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  publishedDate: { type: String, default: '' },
  content: [{ type: String }],
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
