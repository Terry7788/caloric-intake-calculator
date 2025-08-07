'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { dailyEntryApi } from '../../services/api';

interface CalorieChartProps {
  userId: number;
}

interface ChartData {
  date: string;
  consumed: number;
  target: number;
  remaining: number;
}

export default function CalorieChart({ userId }: CalorieChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadChartData();
  }, [userId]);

  const loadChartData = async () => {
    try {
      setLoading(true);
      const entries = await dailyEntryApi.getHistory(userId, 7); // Last 7 days
      
      const formattedData: ChartData[] = entries.map(entry => ({
        date: new Date(entry.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        consumed: entry.totalCalories,
        target: entry.targetCalories,
        remaining: Math.max(0, entry.targetCalories - entry.totalCalories),
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error('Error loading chart data:', error);
      // Mock data for development
      const mockData: ChartData[] = [
        { date: 'Jan 1', consumed: 1850, target: 2000, remaining: 150 },
        { date: 'Jan 2', consumed: 2100, target: 2000, remaining: 0 },
        { date: 'Jan 3', consumed: 1920, target: 2000, remaining: 80 },
        { date: 'Jan 4', consumed: 1750, target: 2000, remaining: 250 },
        { date: 'Jan 5', consumed: 2050, target: 2000, remaining: 0 },
        { date: 'Jan 6', consumed: 1880, target: 2000, remaining: 120 },
        { date: 'Jan 7', consumed: 1950, target: 2000, remaining: 50 },
      ];
      setChartData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleChartTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newChartType: 'line' | 'bar' | null,
  ) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Loading chart data...</Typography>
      </Box>
    );
  }

  if (chartData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="text.secondary">
          No data available yet. Start tracking your meals to see your progress!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          size="small"
        >
          <ToggleButton value="line">Line Chart</ToggleButton>
          <ToggleButton value="bar">Bar Chart</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value} cal`,
                  name === 'consumed' ? 'Consumed' : 
                  name === 'target' ? 'Target' : 'Remaining'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="consumed" 
                stroke="#2196f3" 
                strokeWidth={3}
                dot={{ r: 6 }}
                name="Consumed"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ff9800" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                name="Target"
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value} cal`,
                  name === 'consumed' ? 'Consumed' : 
                  name === 'target' ? 'Target' : 'Remaining'
                ]}
              />
              <Legend />
              <Bar dataKey="consumed" fill="#2196f3" name="Consumed" />
              <Bar dataKey="target" fill="#ff9800" name="Target" />
              <Bar dataKey="remaining" fill="#4caf50" name="Remaining" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}