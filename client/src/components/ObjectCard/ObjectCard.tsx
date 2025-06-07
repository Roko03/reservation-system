import { Link } from 'react-router-dom';

import { LocationPin } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import { ObjectModel } from '@/model/object.model';
import colors from '@/styles/themes/colors';
import { useAuthStore } from '@/valtio/auth/auth.store';

const ObjectCard = ({ id, name, location, image, workTimeFrom, workTimeTo }: ObjectModel) => {
  const { user } = useAuthStore();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        boxShadow: 3,
        height: 200,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {image ? (
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            flex: 1,
          }}
          image={image}
          alt="Object image"
        />
      ) : (
        <Box sx={{ flex: 1, width: '100%', height: '100%', background: colors.black200 }} />
      )}
      <Stack direction="column" width="100%" justifyContent="space-between" flex={1}>
        <CardContent>
          <Stack direction="column" spacing={1.5}>
            <Typography variant="h3" component="p">
              {name}
            </Typography>
            <Typography display="flex" alignItems="center" variant="body1" color={colors.black950}>
              <LocationPin /> {location}
            </Typography>
            <Typography display="flex" alignItems="center" variant="body1" color={colors.black950}>
              Radno vrijeme: {workTimeFrom} - {workTimeTo}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Link to={user ? `/objects/${id}` : '/login'}>
            <Button variant="contained" fullWidth>
              Rezerviraj
            </Button>
          </Link>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default ObjectCard;
