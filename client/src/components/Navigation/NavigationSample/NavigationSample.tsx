import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, List, ListItem, ListItemText, Stack } from '@mui/material';
import cx from 'clsx';

import navigation from '@/config/navigation.config';
import { UserRoleName } from '@/model/user.model';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtio/auth/auth.store';

import styles from './NavigationSample.module.scss';

const NavigationSample = () => {
  const { user } = useAuthStore();

  const isAdmin = user && roleGuard(user.role, [UserRoleName.ADMIN, UserRoleName.SUPERADMIN]);

  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  if (isAdmin) return null;

  return (
    <>
      <List classes={{ root: styles.root }} className={styles.list}>
        {navigation?.map(
          navigationItem =>
            navigationItem.accessLevel?.includes(UserRoleName.USER) && (
              <ListItem className={cx(styles.item, { [styles.active]: isActive(navigationItem.path!) })}>
                <Link to={navigationItem.path || '/'}>
                  <ListItemText
                    primary={navigationItem.text}
                    className={styles.listText}
                    slotProps={{ primary: { variant: 'body1', fontWeight: 600 } }}
                  />
                </Link>
              </ListItem>
            )
        )}
      </List>
      {!user && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Link to="/signup">
            <Button variant="contained" size="large">
              Registracija
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outlined" size="large">
              Prijava
            </Button>
          </Link>
        </Stack>
      )}
    </>
  );
};

export default NavigationSample;
