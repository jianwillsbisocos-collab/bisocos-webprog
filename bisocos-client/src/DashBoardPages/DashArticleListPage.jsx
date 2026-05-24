import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../services/ArticleService';
import { cohesiveCardStyle } from './DashboardPage';

const blankForm = { name: '', title: '', label: '', desc: '', image: '', content: '' };

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadArticles(); }, []);

  const openModal = (article) => {
    setModal({ open: true, id: article?._id ?? null });
    // Join content array with newlines for the text area editor
    setForm(article ? { ...blankForm, ...article, content: article.content.join('\n') } : { ...blankForm });
  };

  const closeModal = () => setModal({ open: false, id: null });

  const handleChange = ({ target: { name, value } }) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Split the text area by newlines to form the array the schema requires
    const nextArticle = { ...form, content: form.content.split('\n').filter(p => p.trim()) };
    try {
      if (modal.id) await updateArticle(modal.id, nextArticle);
      else await createArticle(nextArticle);
      loadArticles();
      closeModal();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await deleteArticle(id);
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name, label, value: form[name], onChange: handleChange, fullWidth: true, required: true, ...extra,
  });

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 150 },
    { field: 'name', headerName: 'Slug (URL)', width: 150 },
    { field: 'label', headerName: 'Label', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>Edit</Button>
          <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(row._id)}>Delete</Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0, maxWidth: '1200px', mx: 'auto' }}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.28em', color: '#a78bfa', mb: 1 }}>Content Management</Typography>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#0c4a6e' }}>Articles Directory</Typography>
        </Box>
      </Stack>

      <Card sx={{ ...cohesiveCardStyle, minWidth: 0 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold' }}>Published Articles</Typography>
            <Button variant="contained" startIcon={<PostAddIcon />} onClick={() => openModal()} sx={{ bgcolor: '#0c4a6e', color: 'white', borderRadius: '2rem', textTransform: 'none', fontWeight: 'bold' }}>
              Write New Article
            </Button>
          </Box>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid rows={articles} columns={columns} getRowId={(row) => row._id} loading={loading} disableRowSelectionOnClick />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md" fullScreen={isMobile}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Draft New Article'}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ pt: 1 }}>
              <TextField {...fieldProps('title', 'Article Title')} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('name', 'Slug / URL Name (e.g. my-project)')} />
                <TextField {...fieldProps('label', 'Label (e.g. Web App)')} />
              </Stack>
              <TextField {...fieldProps('image', 'Cover Image URL')} />
              <TextField {...fieldProps('desc', 'Short Description', { multiline: true, rows: 2 })} />
              <TextField {...fieldProps('content', 'Article Content (Separate paragraphs with Enter key)', { multiline: true, rows: 8 })} />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">Save Article</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
export default DashArticleListPage;