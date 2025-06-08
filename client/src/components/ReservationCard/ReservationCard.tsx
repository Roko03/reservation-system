import { LocationPin } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, CardMedia, Chip, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { RESERVATION_STATUS_LABEL_MAP, ReservationModel } from '@/model/reservation.model';
import colors from '@/styles/themes/colors';
import DateTime from '@/utils/static/DateTime';

interface ReservationCardProps extends Omit<ReservationModel, 'user'> {}

const ReservationCard = ({ date, time, status, object }: ReservationCardProps) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 3,
      height: 309,
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
    <Box flex={1} height={138} position="relative">
      {object.image ? (
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          image={object.image}
          alt="Object image"
        />
      ) : (
        <Box sx={{ width: '100%', height: '100%', background: colors.black200 }} />
      )}
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
            {DateTime.formatHR(dayjs(date))} - {DateTime.formatTime(dayjs(time))}
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

export default ReservationCard;
