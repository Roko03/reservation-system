import { Container, Paper, Stack, Typography } from '@mui/material';

import Layout from '@/components/Layout';
import colors from '@/styles/themes/colors';

const Error403 = () => (
  <Layout>
    <Container maxWidth={false} sx={{ height: '100%', paddingBottom: 3 }}>
      <Paper elevation={0} sx={{ height: '100%' }}>
        <Stack alignItems="center" justifyContent="center" height="100%" gap={1.5}>
          <Typography component="h1" variant="h3" align="center" fontWeight={700} color={colors.black950}>
            Access Denied
          </Typography>
          <Typography variant="body1" align="center" color={colors.black950}>
            You don’t have permission to view this page. <br />
            If you believe this is a mistake, contact your administrator.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  </Layout>
);

export default Error403;
