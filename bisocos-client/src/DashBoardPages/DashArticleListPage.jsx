import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { cohesiveCardStyle } from './DashboardPage';
import { createArticle, fetchArticles } from '../services/ArticleService';

const columns = [
  { field: 'id', headerName: 'ID', width: 90, headerAlign: 'left', align: 'left' },
  { field: 'title', headerName: 'Title', minWidth: 220, flex: 1, headerAlign: 'left', align: 'left' },
  { field: 'author', headerName: 'Author', minWidth: 180, flex: 1, headerAlign: 'left', align: 'left' },
  { field: 'category', headerName: 'Category', width: 160, headerAlign: 'left', align: 'left' },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          params.value === 'Published'
            ? 'bg-green-100 text-green-800'
            : 'bg-amber-100 text-amber-800'
        }`}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: 'publishedDate',
    headerName: 'Published Date',
    width: 190,
    headerAlign: 'left',
    align: 'left',
    valueFormatter: (value) => {
      if (!value) return '';
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },
  },
];

const initialRows = [
  {
    id: 1,
    title: 'React State Management Basics',
    author: 'Jane Doe',
    category: 'Web Development',
    status: 'Published',
    publishedDate: '2025-01-15',
  },
  {
    id: 2,
    title: 'Material UI: From Theme to Components',
    author: 'John Smith',
    category: 'Frontend',
    status: 'Draft',
    publishedDate: '',
  },
  {
    id: 3,
    title: 'Writing Clean Component APIs',
    author: 'Alex Johnson',
    category: 'Best Practices',
    status: 'Published',
    publishedDate: '2025-03-03',
  },
];

const makeEmptyForm = () => ({
  title: '',
  author: '',
  category: '',
  status: 'Draft',
  publishedDate: '',
  content: '',
});

const toArticleRow = (article, fallbackId) => ({
  id: article._id ?? article.id ?? fallbackId,
  title: article.title ?? '',
  author: article.author ?? '',
  category: article.category ?? article.label ?? '',
  status: article.status ?? 'Draft',
  publishedDate: article.publishedDate ?? '',
  content: Array.isArray(article.content) ? article.content.join('\n') : article.content ?? '',
});

function validate(form) {
  const errors = {};

  if (!form.title.trim()) errors.title = 'Title is required';

  if (!form.author.trim()) errors.author = 'Author is required';

  if (!form.category.trim()) errors.category = 'Category is required';

  if (!form.status || !['Draft', 'Published'].includes(form.status)) {
    errors.status = 'Status must be Draft or Published';
  }

  if (form.status === 'Published') {
    if (!form.publishedDate.trim()) {
      errors.publishedDate = 'Published date is required when status is Published';
    }
  }

  if (!form.content.trim()) errors.content = 'Content is required';

  return errors;
}

function DashArticleListPage() {
  const [articleRows, setArticleRows] = useState(initialRows);
  const [isSaving, setIsSaving] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(makeEmptyForm());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        const rows = (data?.articles || []).map((article, index) => toArticleRow(article, index + 1));
        if (rows.length) setArticleRows(rows);
      } catch {
        // Keep sample rows visible if the backend is not reachable.
      }
    };

    loadArticles();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(articleRows.map((r) => r.category).filter(Boolean));
    return Array.from(set);
  }, [articleRows]);

  const filteredRows = useMemo(() => {
    return articleRows.filter((article) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q || article.title?.toLowerCase().includes(q) || article.author?.toLowerCase().includes(q);

      const matchesCategory = !categoryFilter || article.category === categoryFilter;
      const matchesStatus = !statusFilter || article.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [articleRows, searchQuery, categoryFilter, statusFilter]);

  const handleOpen = () => {
    setDialogOpen(true);
    setErrors({});
    setForm(makeEmptyForm());
  };

  const handleClose = () => {
    setDialogOpen(false);
    setErrors({});
    setForm(makeEmptyForm());
  };

  const handleChange = (key) => (e) => {
    const next = { ...form, [key]: e.target.value };
    setForm(next);
    setErrors(validate(next));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSaving(true);
    try {
      const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category.trim(),
      status: form.status,
      publishedDate: form.status === 'Published' ? form.publishedDate : '',
        content: form.content,
    };

      const { data } = await createArticle(payload);
      setArticleRows((prev) => [toArticleRow(data, Date.now()), ...prev]);
      handleClose();
    } catch (error) {
      setErrors({
        form: error?.response?.data?.message || error?.message || 'Failed to save article',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.28em', color: '#38bdf8', mb: 1 }}
      >
        Article Management
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0c4a6e' }}>
          System Articles
        </Typography>

        <Button variant="contained" onClick={handleOpen} sx={{ borderRadius: '1rem', px: 3, bgcolor: '#38bdf8' }}>
          Add Article
        </Button>
      </Stack>

      <Card sx={cohesiveCardStyle}>
        <CardContent>
          <Stack direction="column" spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search articles by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#64748b' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1rem', backgroundColor: '#f8fafc' } }}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-start">
              <FormControl
                variant="outlined"
                sx={{
                  minWidth: 150,
                  flex: 1,
                  maxWidth: 200,
                  '& .MuiOutlinedInput-root': { borderRadius: '1rem', backgroundColor: '#f8fafc' },
                }}
              >
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Category">
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                sx={{
                  minWidth: 150,
                  flex: 1,
                  maxWidth: 200,
                  '& .MuiOutlinedInput-root': { borderRadius: '1rem', backgroundColor: '#f8fafc' },
                }}
              >
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Published">Published</MenuItem>
                </Select>
              </FormControl>

              {/* spacer keeps row spacing consistent with the original 3-control layout */}
              <Box sx={{ minWidth: 150, flex: 1, maxWidth: 200 }} />
            </Stack>

            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                sx={{
                  border: 0,
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f8fafc',
                    borderBottom: '2px solid #e0f2fe',
                  },
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection={false}
                disableRowSelectionOnClick
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Article</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} id="add-article-form">
            <Stack spacing={2} sx={{ pt: 1 }}>
              {errors.form && (
                <Typography color="error" variant="body2">
                  {errors.form}
                </Typography>
              )}

              <TextField
                label="Title"
                value={form.title}
                onChange={handleChange('title')}
                error={Boolean(errors.title)}
                helperText={errors.title || ''}
                fullWidth
                required
              />

              <TextField
                label="Author"
                value={form.author}
                onChange={handleChange('author')}
                error={Boolean(errors.author)}
                helperText={errors.author || ''}
                fullWidth
                required
              />

              <TextField
                label="Category"
                value={form.category}
                onChange={handleChange('category')}
                error={Boolean(errors.category)}
                helperText={errors.category || ''}
                fullWidth
                required
              />

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={form.status} label="Status" onChange={handleChange('status')}>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Published">Published</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Published Date"
                type="date"
                value={form.publishedDate}
                onChange={handleChange('publishedDate')}
                error={Boolean(errors.publishedDate)}
                helperText={
                  errors.publishedDate || (form.status === 'Published' ? 'Required' : 'Optional for Draft')
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
                required={form.status === 'Published'}
              />

              <TextField
                label="Content"
                value={form.content}
                onChange={handleChange('content')}
                error={Boolean(errors.content)}
                helperText={errors.content || ''}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isSaving} type="submit" form="add-article-form" variant="contained" sx={{ borderRadius: '1rem', bgcolor: '#38bdf8' }}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;

