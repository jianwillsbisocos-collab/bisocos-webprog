import React from 'react';
import { Typography, Stack, Card, CardContent, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { cohesiveCardStyle } from './DashboardPage';

function ReportsPage() {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.28em', color: '#a78bfa', mb: 1 }}>
        Data Visualization
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 900, color: '#0c4a6e', mb: 4 }}>
        Analytics Reports
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4 }}>
        {/* Bar Chart Card */}
        <Card sx={{ ...cohesiveCardStyle, flex: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold', mb: 2 }}>
              Quarterly Sales
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: 'Series 1', color: '#38bdf8' },
                  { data: [51, 6, 49, 30], label: 'Series 2', color: '#8b5cf6' },
                ]}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Pie Chart Card */}
        <Card sx={{ ...cohesiveCardStyle, flex: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold', mb: 2, alignSelf: 'flex-start' }}>
              Distribution
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Alpha', color: '#34d399' },
                    { id: 1, value: 15, label: 'Beta', color: '#38bdf8' },
                    { id: 2, value: 20, label: 'Gamma', color: '#8b5cf6' },
                  ],
                },
              ]}
              width={300}
              height={250}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;