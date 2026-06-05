const Article = require('../models/Article');

const slugify = (value) => (
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `article-${Date.now()}`
);

const normalizeArticleBody = (body) => {
  const content = Array.isArray(body.content)
    ? body.content
    : body.content
      ? body.content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
      : [];

  const title = body.title?.trim();
  const category = body.category?.trim() || '';
  const firstParagraph = content[0] || '';

  return {
    ...body,
    name: body.name?.trim() || `${slugify(title || 'article')}-${Date.now()}`,
    title,
    label: body.label?.trim() || category || title,
    desc: body.desc?.trim() || firstParagraph.slice(0, 180),
    author: body.author?.trim() || '',
    category,
    status: body.status === 'Published' ? 'Published' : 'Draft',
    publishedDate: body.status === 'Published' ? body.publishedDate || '' : '',
    content,
  };
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(normalizeArticleBody(req.body));
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, normalizeArticleBody(req.body), { new: true });
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle };
