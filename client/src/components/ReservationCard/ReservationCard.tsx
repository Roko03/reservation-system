import { LocationPin } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, CardMedia, Chip, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { RESERVATION_STATUS_LABEL_MAP, ReservationModel, ReservationStatus } from '@/model/reservation.model';
import colors from '@/styles/themes/colors';
import DateTime from '@/utils/static/DateTime';
import formatTime from '@/utils/static/formatTime';
import {
  findReservation,
  toggleDeleteReservationModal,
  toggleUpdateReservationModal,
} from '@/valtio/auth/auth.actions';

interface ReservationCardProps extends Omit<ReservationModel, 'user'> {
  reservationIndex: number;
}

const ReservationCard = ({ reservationIndex, date, time, status, object }: ReservationCardProps) => {
  const isEditable = status === ReservationStatus.PENDING;

  const handleUpdateClick = (e: React.MouseEvent): void => {
    const { index } = (e.currentTarget as HTMLElement).dataset;

    if (!index) return;

    findReservation(index);
    toggleUpdateReservationModal(true);
  };

  const handleDeleteClick = (e: React.MouseEvent): void => {
    const { index } = (e.currentTarget as HTMLElement).dataset;

    if (!index) return;

    findReservation(index);
    toggleDeleteReservationModal(true);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        height: 360,
        borderRadius: '12px',
        overflow: 'hidden',
        '&:hover': {
          '& .action-buttons': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Box flex={1} height={170} padding={2} position="relative">
        {object.image ? (
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 1.5,
              overflow: 'hidden',
            }}
            image={object.image}
            alt="Object image"
          />
        ) : (
          <Box
            sx={{ width: '100%', height: '100%', background: colors.black200, borderRadius: 1.5, overflow: 'hidden' }}
          />
        )}
        {isEditable && (
          <Box
            className="action-buttons"
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              opacity: 0,
              transition: 'all 0.3s ease',
              zIndex: 1,
              display: 'flex',
              gap: 2,
            }}
          >
            <IconButton
              size="large"
              data-index={reservationIndex}
              onClick={handleUpdateClick}
              sx={{
                background: colors.orange,
                color: colors.black50,
                '&:hover': {
                  background: colors.orange,
                  color: colors.black50,
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="large"
              data-index={reservationIndex}
              onClick={handleDeleteClick}
              sx={{
                background: colors.red100,
                color: colors.black50,
                '&:hover': {
                  background: colors.red100,
                  color: colors.black50,
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Stack direction="column" width="100%" justifyContent="space-between" flex={1}>
        <CardContent>
          <Stack direction="column" spacing={1.5}>
            <Typography variant="h3" component="p">
              {object.name}
            </Typography>
            <Typography display="flex" alignItems="center" variant="body1" color={colors.black950}>
              <LocationPin /> {object.location}
            </Typography>
            <Typography display="flex" alignItems="center" variant="body1" color={colors.black950}>
              {DateTime.formatHR(dayjs(date))} - {formatTime(time)}
            </Typography>
            <Chip
              label={RESERVATION_STATUS_LABEL_MAP[status]}
              color={
                // eslint-disable-next-line no-nested-ternary
                RESERVATION_STATUS_LABEL_MAP[status] === 'Odbijena'
                  ? 'error'
                  : RESERVATION_STATUS_LABEL_MAP[status] === 'Prihvaceno'
                    ? 'success'
                    : 'warning'
              }
              sx={{
                alignSelf: 'flex-start',
              }}
            />
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default ReservationCard;
