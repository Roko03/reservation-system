import { Link } from 'react-router-dom';

import { List, Stack, Typography } from '@mui/material';

import NavigationItem from '@/components/Navigation/NavigationItem';
import navigation from '@/config/navigation.config';
import { UserRoleName } from '@/model/user.model';
import colors from '@/styles/themes/colors';

import styles from './NavigationSidebar.module.scss';

const NavigationSidebar = () => (
  <Stack component="nav" className={styles.container}>
    <Link to="/admin" className={styles.link}>
      <Typography component="span" variant="h2" color={colors.black950} textAlign="center">
        RP
      </Typography>
    </Link>
    <List className={styles.list}>
      {navigation?.map(
        navigationItem =>
          navigationItem.accessLevel?.some(role => [UserRoleName.ADMIN, UserRoleName.SUPERADMIN].includes(role)) && (
            <NavigationItem key={navigationItem.id} {...navigationItem} icon={navigationItem.icon!} />
          )
      )}
    </List>
  </Stack>
);

export default NavigationSidebar;
