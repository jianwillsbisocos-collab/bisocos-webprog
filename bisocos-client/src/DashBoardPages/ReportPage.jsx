import React from 'react';
import { Typography, Stack, Card, CardContent, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { cohesiveCardStyle } from './DashboardPage';

function ReportsPage() {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }} className="print:bg-white print:shadow-none print:border print:p-6 print:mx-auto print:w-full print:max-w-4xl">
      <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.28em', color: '#a78bfa', mb: 1 }} className="print:text-gray-900 print:font-bold">
        Data Visualization
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 900, color: '#0c4a6e', mb: 4 }} className="print:text-2xl print:font-bold print:text-black print:mb-4">
        Analytics Reports
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4 }} className="print:flex-col print:gap-4 print:items-stretch">
        {/* Bar Chart Card */}
        <Card sx={{ ...cohesiveCardStyle, flex: 2 }} className="print:bg-white print:border print:border-gray-400 print:rounded-lg print:shadow-print print:mb-4 print:w-full print:break-inside-avoid">
          <CardContent>
            <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold', mb: 2 }} className="print:text-lg print:font-bold print:text-black print:mb-2">
              Quarterly Sales
            </Typography>
            <Box sx={{ width: '100%', height: 300 }} className="print:h-80 print:w-full">
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
        <Card sx={{ ...cohesiveCardStyle, flex: 1 }} className="print:bg-white print:border print:border-gray-400 print:rounded-lg print:shadow-print print:w-full print:break-inside-avoid">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="print:p-4 print:justify-center">
            <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold', mb: 2, alignSelf: 'flex-start' }} className="print:text-base print:font-bold print:text-black print:mb-2 print:self-start">
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
              className="print:w-64 print:h-48 print:max-w-full"
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;

