import React from 'react'
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Reusable cohesive style to match your Tailwind theme
export const cohesiveCardStyle = {
  borderRadius: '1.5rem',
  border: '2px solid #e0f2fe',
  boxShadow: '0 20px 25px -5px rgb(186 230 253 / 0.5), 0 8px 10px -6px rgb(186 230 253 / 0.5)',
  backgroundColor: '#ffffff',
};

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DashboardPage() {
  const location = useLocation();

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.28em', color: '#34d399', mb: 1 }}>
        Overview
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 900, color: '#0c4a6e', mb: 4 }}>
        Dashboard Summary
      </Typography>

      {/* Summary Section */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }} display='flex'>
        <Card sx={{ ...cohesiveCardStyle, flex: 1, bgcolor: '#f0f9ff' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold' }}>Total Users</Typography>
            <Typography variant="h3" sx={{ color: '#8b5cf6', fontWeight: 900 }}>9</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>Active registered users</Typography>
          </CardContent>
        </Card>
        <Card sx={{ ...cohesiveCardStyle, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold' }}>Average Age</Typography>
            <Typography variant="h3" sx={{ color: '#8b5cf6', fontWeight: 900 }}>47.8</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>Based on user demographics</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Gauges */}
      <Card sx={{ ...cohesiveCardStyle, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold', mb: 2 }}>System Health</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="center" alignItems="center">
            <Box textAlign="center">
              <Gauge width={120} height={120} value={85} sx={{ [`& .MuiGauge-valueArc`]: { fill: '#34d399' } }} />
              <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>Server Load</Typography>
            </Box>
            <Box textAlign="center">
              <Gauge width={120} height={120} value={50} valueMin={10} valueMax={60} sx={{ [`& .MuiGauge-valueArc`]: { fill: '#8b5cf6' } }} />
              <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>Memory Usage</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* React Leaflet Map */}
      <Card sx={cohesiveCardStyle}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold', mb: 2 }}>Location Map</Typography>
          <Box sx={{ height: 400, width: '100%', borderRadius: '1rem', overflow: 'hidden', border: '2px solid #e0f2fe' }}>
            <MapContainer center={[14.604253, 120.994314]} zoom={16} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  <b>National University-Manila</b> <br />
                  <i>551 F Jhocson St, Sampaloc, Manila</i>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;