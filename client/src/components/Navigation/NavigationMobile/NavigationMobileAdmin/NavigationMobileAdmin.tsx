import { Link } from 'react-router-dom';

import { Close } from '@mui/icons-material';
import { Container, Grid, Icon, IconButton, List, Typography } from '@mui/material';

import NavigationItem from '@/components/Navigation/NavigationItem';
import navigation from '@/config/navigation.config';
import { UserRoleName } from '@/model/user.model';
import colors from '@/styles/themes/colors';

import styles from './NavigationMobileAdmin.module.scss';

interface NavigationMobileAdminProps {
  handleClose: () => void;
}

const NavigationMobileAdmin = ({ handleClose }: NavigationMobileAdminProps) => (
  <Container maxWidth="xl" component="nav" className={styles.container}>
    <Grid container justifyContent="center" className={styles.header}>
      <Link to="/admin">
        <Typography component="span" variant="h2" color={colors.black950}>
          RP
        </Typography>
      </Link>
      <IconButton onClick={handleClose} className={styles.close}>
        <Icon>
          <Close />
        </Icon>
      </IconButton>
    </Grid>
    <List className={styles.list}>
      {navigation?.map(
        navigationItem =>
          navigationItem.accessLevel?.some(role => [UserRoleName.ADMIN, UserRoleName.SUPERADMIN].includes(role)) && (
            <NavigationItem key={navigationItem.id} {...navigationItem} icon={navigationItem.icon!} />
          )
      )}
    </List>
  </Container>
);

export default NavigationMobileAdmin;
