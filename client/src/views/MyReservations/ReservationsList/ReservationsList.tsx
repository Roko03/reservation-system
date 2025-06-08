import React, { useEffect } from 'react';

import { Container, Grid, Stack, Typography } from '@mui/material';

import Pagination from '@/components/Pagination';
import ReservationCard from '@/components/ReservationCard';
import { PAGE_NUMBER, PAGE_SIZE } from '@/config/constants.config';
import useQueryParams from '@/utils/hooks/useQueryParams';
import { getUserReservations } from '@/valtio/auth/auth.actions';
import { useAuthStore } from '@/valtio/auth/auth.store';

const ReservationsList = () => {
  const { pageNumber, handlePageChange } = useQueryParams();
  const { reservations, totalCount } = useAuthStore();

  useEffect(() => {
    const page = pageNumber - PAGE_NUMBER;

    getUserReservations(page);
  }, [pageNumber]);

  if (reservations.length <= 0) {
    return (
      <Container component="section" maxWidth={false}>
        <Stack py={4}>
          <Typography component="p" variant="h1">
            Korisnik nema rezervacija
          </Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Container component="section" maxWidth={false}>
      <Stack py={4}>
        <Grid container spacing={2}>
          {reservations.map((reservation, index) => (
            <Grid key={reservation.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ReservationCard {...reservation} reservationIndex={index} />
            </Grid>
          ))}
        </Grid>
        <Stack pt={4} margin="auto" maxWidth={1100}>
          <Pagination
            page={pageNumber + 1}
            onChange={handlePageChange}
            count={Math.ceil(totalCount / PAGE_SIZE)}
            hideText
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default ReservationsList;
