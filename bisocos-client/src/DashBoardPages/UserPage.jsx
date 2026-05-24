import React, { useMemo, useState } from 'react';
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
import { useUsers } from '../contexts/UserContext';

const columns = [
  { field: 'id', headerName: 'ID', width: 90, headerAlign: 'left', align: 'left' },
  { field: 'username', headerName: 'Username', width: 150, headerAlign: 'left', align: 'left' },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 130,
    editable: false,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 130,
    editable: false,
    headerAlign: 'left',
    align: 'left',
  },
  { field: 'email', headerName: 'Email', width: 220, headerAlign: 'left', align: 'left' },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    minWidth: 100,
    headerAlign: 'left',
    align: 'left',
    editable: false,
  },
  { field: 'role', headerName: 'Role', minWidth: 110, headerAlign: 'left', align: 'left' },
  { field: 'gender', headerName: 'Gender', minWidth: 110, headerAlign: 'left', align: 'left' },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          params.value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 160,
    headerAlign: 'left',
    align: 'left',
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
  },
];

const initialRows = [
  { id: 1, username: 'jonsnow', firstName: 'Jon', lastName: 'Snow', email: 'jon.snow@winterfell.com', age: 25, role: 'Admin', gender: 'Male', status: 'Active' },
  { id: 2, username: 'cerseil', firstName: 'Cersei', lastName: 'Lannister', email: 'cersei.lannister@kingslanding.com', age: 38, role: 'Admin', gender: 'Female', status: 'Active' },
  { id: 3, username: 'jaimel', firstName: 'Jaime', lastName: 'Lannister', email: 'jaime.lannister@kingslanding.com', age: 40, role: 'Staff', gender: 'Male', status: 'Active' },
  { id: 4, username: 'aryas', firstName: 'Arya', lastName: 'Stark', email: 'arya.stark@winterfell.com', age: 16, role: 'User', gender: 'Female', status: 'Active' },
  { id: 5, username: 'daenerys', firstName: 'Daenerys', lastName: 'Targaryen', email: 'daenerys.targaryen@dragons.com', age: 24, role: 'User', gender: 'Female', status: 'Active' },
  { id: 6, username: 'melisandre', firstName: 'Melisandre', lastName: 'Red Priestess', email: 'melisandre@lightbringer.com', age: 150, role: 'Staff', gender: 'Female', status: 'Inactive' },
  { id: 7, username: 'ferrara', firstName: 'Ferrara', lastName: 'Clifford', email: 'ferrara.clifford@company.com', age: 44, role: 'User', gender: 'Male', status: 'Active' },
  { id: 8, username: 'rossini', firstName: 'Rossini', lastName: 'Frances', email: 'frances.rossini@company.com', age: 36, role: 'Staff', gender: 'Female', status: 'Active' },
  { id: 9, username: 'harvey', firstName: 'Harvey', lastName: 'Roxie', email: 'roxie.harvey@company.com', age: 65, role: 'User', gender: 'Male', status: 'Inactive' },
  { id: 10, username: 'admin1', firstName: 'Admin', lastName: 'One', email: 'admin1@company.com', age: 32, role: 'Admin', gender: 'Male', status: 'Active' },
  { id: 11, username: 'usernew', firstName: 'New', lastName: 'User', email: 'new.user@company.com', age: 28, role: 'User', gender: 'Female', status: 'Active' },
  { id: 12, username: 'staff2', firstName: 'Staff', lastName: 'Two', email: 'staff.two@company.com', age: 41, role: 'Staff', gender: 'Male', status: 'Inactive' },
  { id: 13, username: 'jane.doe', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@company.com', age: 29, role: 'User', gender: 'Female', status: 'Active' },
  { id: 14, username: 'john.smith', firstName: 'John', lastName: 'Smith', email: 'john.smith@company.com', age: 35, role: 'Staff', gender: 'Male', status: 'Active' },
  { id: 15, username: 'test.user', firstName: 'Test', lastName: 'User', email: 'test.user@company.com', age: 22, role: 'User', gender: 'Male', status: 'Inactive' },
];

const makeEmptyForm = () => ({
  username: '',
  password: '',
  contactNumber: '',
  age: '',
  firstName: '',
  lastName: '',
  email: '',
  role: 'User',
  gender: 'Male',
  status: 'Active',
});

function validate(form) {
  const errors = {};

  // username: no spaces
  if (!form.username.trim()) errors.username = 'Username is required';
  else if (/\s/.test(form.username)) errors.username = 'Username must not contain spaces';

  // password: >= 8 chars
  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 8) errors.password = 'Password must be at least 8 characters';

  // contact number: exactly 11 digits
  if (!form.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
  else if (!/^\d{11}$/.test(form.contactNumber)) errors.contactNumber = 'Contact number must be exactly 11 digits';

  // age: number only
  if (!form.age.toString().trim()) errors.age = 'Age is required';
  else if (!/^\d+$/.test(String(form.age))) errors.age = 'Age must be a number only';

  if (!form.firstName.trim()) errors.firstName = 'First name is required';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required';
  if (!form.email.trim()) errors.email = 'Email is required';

  return errors;
}

function UsersPage() {
  const { userRows, isUsernameTaken, signupViaBackendThenCache } = useUsers();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(makeEmptyForm());
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const rows = useMemo(() => {
    const seen = new Set();

    return [...userRows, ...initialRows].filter((user) => {
      const key = (user.username || user.email || user.id).toString().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [userRows]);

  const filteredRows = useMemo(() => {
    return rows.filter((user) => {
      const matchesSearch =
        !searchQuery ||
        user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesGender = !genderFilter || user.gender === genderFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [rows, searchQuery, roleFilter, genderFilter, statusFilter]);

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

    // realtime validation for changed field (simple + friendly)
    const nextErrors = validate(next);
    setErrors(nextErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    const isSampleUsernameTaken = initialRows.some(
      (row) => row.username.toLowerCase() === form.username.trim().toLowerCase()
    );

    if (!nextErrors.username && (isUsernameTaken(form.username) || isSampleUsernameTaken)) {
      nextErrors.username = 'Username is already taken';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSaving(true);
    try {
      await signupViaBackendThenCache({
        form: {
          ...form,
          username: form.username.trim(),
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          age: Number(form.age),
        },
      });
      handleClose();
    } catch (error) {
      setErrors({
        form: error?.response?.data?.message || error?.message || 'Failed to save user',
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
        User Management
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0c4a6e' }}>
          System Users
        </Typography>

        <Button variant="contained" onClick={handleOpen} sx={{ borderRadius: '1rem', px: 3, bgcolor: '#38bdf8' }}>
          Add User
        </Button>
      </Stack>

      <Card sx={cohesiveCardStyle}>
        <CardContent>
          <Stack direction="column" spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search users by name, email, or username..."
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
                <InputLabel>Role</InputLabel>
                <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} label="Role">
                  <MenuItem value="">All Roles</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                  <MenuItem value="User">User</MenuItem>
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
                <InputLabel>Gender</InputLabel>
                <Select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} label="Gender">
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
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
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                getRowId={(row) => row.username || row.email || row.id}
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
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} id="add-user-form">
            <Stack spacing={2} sx={{ pt: 1 }}>
              {errors.form && (
                <Typography variant="body2" color="error">
                  {errors.form}
                </Typography>
              )}

              <TextField
                label="Username"
                value={form.username}
                onChange={handleChange('username')}
                error={Boolean(errors.username)}
                helperText={errors.username || 'No spaces allowed'}
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                error={Boolean(errors.password)}
                helperText={errors.password || 'Minimum 8 characters'}
                fullWidth
              />

              <TextField
                label="Contact Number"
                value={form.contactNumber}
                onChange={handleChange('contactNumber')}
                error={Boolean(errors.contactNumber)}
                helperText={errors.contactNumber || 'Exactly 11 digits'}
                fullWidth
              />

              <TextField
                label="Age"
                value={form.age}
                onChange={handleChange('age')}
                error={Boolean(errors.age)}
                helperText={errors.age || 'Numbers only'}
                fullWidth
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  label="First Name"
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName || ''}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName || ''}
                  fullWidth
                />
              </Stack>

              <TextField
                label="Email"
                value={form.email}
                onChange={handleChange('email')}
                error={Boolean(errors.email)}
                helperText={errors.email || ''}
                fullWidth
              />

              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select value={form.role} label="Role" onChange={handleChange('role')}>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Staff">Staff</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select value={form.gender} label="Gender" onChange={handleChange('gender')}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={form.status} label="Status" onChange={handleChange('status')}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            form="add-user-form"
            variant="contained"
            disabled={isSaving}
            sx={{ borderRadius: '1rem', bgcolor: '#38bdf8' }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;

