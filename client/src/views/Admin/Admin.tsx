import React, { useCallback, useEffect, useRef, useState } from 'react';

import { EventAvailable, StadiumOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import * as Chart from 'chart.js';
import { Dayjs } from 'dayjs';

import DateDisplay from '@/components/DateDisplay';
import DatePickerButton from '@/components/DatePickerButton';
import Layout from '@/components/Layout';
import { Users } from '@/components/SvgIcons/Navigation';
import { InfoItem } from '@/model/info.model';
import colors from '@/styles/themes/colors';
import DateTime from '@/utils/static/DateTime';
import { useAuthStore } from '@/valtio/auth/auth.store';
import { getInfo, getInfoReservation } from '@/valtio/info/info.action';
import { useInfoStore } from '@/valtio/info/info.store';

Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.BarElement,
  Chart.BarController,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend
);

const Admin = () => {
  const { user } = useAuthStore();
  const { info, reservations, isLoading } = useInfoStore();

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart.Chart | null>(null);
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(DateTime.now());

  const createChart = useCallback(() => {
    if (!reservations || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    if (!ctx) return;

    chartInstance.current = new Chart.Chart(ctx, {
      type: 'bar',
      data: {
        labels: reservations.months,
        datasets: [
          {
            label: `Rezervacije ${reservations.year}`,
            data: reservations.counts,
            backgroundColor: [
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 205, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(199, 199, 199, 0.8)',
              'rgba(83, 102, 255, 0.8)',
              'rgba(255, 99, 255, 0.8)',
              'rgba(255, 159, 128, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 99, 132, 0.8)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
              'rgba(83, 102, 255, 1)',
              'rgba(255, 99, 255, 1)',
              'rgba(255, 159, 128, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Mjesečne rezervacije - ${reservations.year}`,
            font: {
              size: 18,
              weight: 'bold',
            },
            padding: 20,
          },
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            callbacks: {
              label(context) {
                return `Rezervacije: ${context.parsed.y}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback(value) {
                return Number.isInteger(value) ? value : '';
              },
            },
            title: {
              display: true,
              text: 'Broj rezervacija',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
          x: {
            title: {
              display: true,
              text: 'Mjesec',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart',
        },
      },
    });
  }, [reservations]);

  useEffect(() => {
    if (reservations) {
      createChart();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [createChart, reservations]);

  const handleYearChange = (value: Dayjs | null) => {
    setSelectedYear(value);
  };

  useEffect(() => {
    getInfo();
    getInfoReservation(selectedYear?.get('year') || DateTime.now().get('year'));
  }, [selectedYear]);

  const infoItems: InfoItem[] = [
    { label: 'Objekata', value: info?.numberOfObjects || 0, icon: StadiumOutlined },
    { label: 'Korisnika', value: info?.numberOfUsers || 0, icon: Users },
    { label: 'Rezervacija', value: info?.numberOfReservations || 0, icon: EventAvailable },
  ];

  return (
    <Layout isAdmin>
      <Container maxWidth={false}>
        <Typography component="p" variant="h1" pt={12}>
          Dobrodosli, {user?.firstname} {user?.lastName}
        </Typography>
        <Stack direction="row" spacing={2} pt={4}>
          {infoItems.map(({ label, value, icon: Icon }) => (
            <Card key={label} sx={{ maxWidth: 200, flex: 1, backgroundColor: colors.green50 }}>
              <CardContent>
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  color={colors.green300}
                >
                  {Icon && <Icon style={{ fontSize: '24px' }} />}
                  <Typography component="p" variant="h3" fontWeight={500}>
                    {label}
                  </Typography>
                  <Typography component="p" variant="h2" fontWeight={700}>
                    {value}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
        <Box pt={4}>
          <Card sx={{ backgroundColor: colors.green50 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h2" fontWeight={600}>
                  Pregled rezervacija
                </Typography>
                <Stack flexDirection="row" alignItems="center" gap={1}>
                  <DateDisplay date={selectedYear?.format('YYYY')} />
                  <DatePickerButton value={selectedYear} onChange={handleYearChange} views={['year']} />
                </Stack>
              </Stack>
              {reservations && (
                <Grid container spacing={2} mb={3}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h3" fontWeight={700} color="primary">
                        {reservations.total}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Ukupno rezervacija
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h3" fontWeight={700} color="success.main">
                        {Math.max(...(reservations.counts || [0]))}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Najaktivniji mjesec
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        backgroundColor: 'rgba(153, 102, 255, 0.1)',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h3" fontWeight={700} color="secondary.main">
                        {(reservations.total / 12).toFixed(1)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Mjesečni prosjek
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
              {isLoading ? (
                <Box
                  sx={{
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>Učitavanje...</Typography>
                </Box>
              ) : (
                <Box sx={{ height: 400, position: 'relative' }}>
                  <canvas ref={chartRef} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
};

export default Admin;
