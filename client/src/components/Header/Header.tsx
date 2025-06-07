import { Link } from 'react-router-dom';

import { Menu } from '@mui/icons-material';
import { AppBar, Drawer, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import cx from 'clsx';

import NavigationMobile from '@/components/Navigation/NavigationMobile';
import NavigationSample from '@/components/Navigation/NavigationSample';
import ProfileDropdown from '@/components/ProfileDropdown';
import { UserRoleName } from '@/model/user.model';
import colors from '@/styles/themes/colors';
import useToggleState from '@/utils/hooks/useToggleState';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtio/auth/auth.store';

import styles from './Header.module.scss';

const Header = () => {
  const [navigationOpen, toggleNavigation] = useToggleState();
  const { user } = useAuthStore();

  const isAdmin = user && roleGuard(user.role, [UserRoleName.ADMIN, UserRoleName.SUPERADMIN]);

  return (
    <>
      <AppBar position="fixed" className={styles.container} elevation={0}>
        <Toolbar className={cx(styles.toolbar, { [styles.adminToolbar]: isAdmin })}>
          <IconButton className={styles.menuButton} aria-label="Open navigation drawer" onClick={toggleNavigation}>
            <Menu />
          </IconButton>
          {!isAdmin && (
            <Link to="/">
              <Typography component="span" variant="h2" color={colors.black950}>
                RP
              </Typography>
            </Link>
          )}
          <Stack direction="row" alignItems="center" spacing={2}>
            <NavigationSample />
            <ProfileDropdown />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        open={navigationOpen}
        onClose={toggleNavigation}
        classes={{ paper: styles.paper }}
        className={styles.drawer}
        keepMounted
      >
        <NavigationMobile handleClose={toggleNavigation} />
      </Drawer>
    </>
  );
};

export default Header;
