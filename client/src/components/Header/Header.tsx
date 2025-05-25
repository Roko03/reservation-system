import { AppBar, Button, Container, Divider, Stack } from '@mui/material';

import colors from '@/styles/themes/colors';

import Navigation from './Navigation/Navigation';

const Header = () => (
  <AppBar elevation={0}>
    <Container disableGutters maxWidth="xl">
      <a href="/">Ej</a>
      <Stack direction="row" alignItems="center" gap={2}>
        <Navigation />
        <Divider orientation="vertical" variant="middle" flexItem sx={{ color: colors.black200 }} />
        <Stack direction="row" gap={1} />
        <Button color="secondary">Sign In</Button>
      </Stack>
    </Container>
  </AppBar>
);

export default Header;
