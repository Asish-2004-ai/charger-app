import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Grid
} from '@mui/material';

export default function Dashboard() {
  const [chargers, setChargers] = useState([]);
  const [form, setForm] = useState(initialFormState());
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState({ status: '', connectorType: '' });
  const navigate = useNavigate();

  function initialFormState() {
    return {
      name: '',
      latitude: '',
      longitude: '',
      status: 'Active',
      powerOutput: '',
      connectorType: ''
    };
  }

  const fetchChargers = async () => {
    const res = await axios.get('/chargers');
    setChargers(res.data);
  };

  useEffect(() => {
    fetchChargers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/chargers/${editingId}`, form);
      } else {
        await axios.post('/chargers', form);
      }
      setForm(initialFormState());
      setEditingId(null);
      fetchChargers();
    } catch (err) {
      alert('Error saving charger');
    }
  };

  const handleEdit = (charger) => {
    setForm(charger);
    setEditingId(charger._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this charger?')) {
      await axios.delete(`/chargers/${id}`);
      fetchChargers();
    }
  };

  const filteredChargers = chargers.filter(c =>
    (!filter.status || c.status === filter.status) &&
    (!filter.connectorType || c.connectorType.toLowerCase().includes(filter.connectorType.toLowerCase()))
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom mt={4}>Charger Dashboard</Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth type="number" label="Latitude" value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} required />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth type="number" label="Longitude" value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} required />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} required>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField fullWidth type="number" label="Power Output (kW)" value={form.powerOutput} onChange={e => setForm({ ...form, powerOutput: e.target.value })} required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Connector Type" value={form.connectorType} onChange={e => setForm({ ...form, connectorType: e.target.value })} required />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {editingId ? 'Update Charger' : 'Add Charger'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6" gutterBottom>Filters</Typography>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Connector Type"
          value={filter.connectorType}
          onChange={e => setFilter({ ...filter, connectorType: e.target.value })}
        />
      </Box>

      <Typography variant="h6" gutterBottom>Chargers</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Power (kW)</TableCell>
              <TableCell>Connector</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredChargers.map(c => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell>{c.powerOutput}</TableCell>
                <TableCell>{c.connectorType}</TableCell>
                <TableCell>{`(${c.latitude}, ${c.longitude})`}</TableCell>
                <TableCell align="center">
                  <Button size="small" onClick={() => handleEdit(c)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(c._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box textAlign="center" mt={4}>
        <Button variant="outlined" onClick={() => navigate('/map')}>View on Map</Button>
      </Box>
    </Container>
  );
}
