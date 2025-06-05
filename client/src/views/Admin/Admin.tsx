import React, { useEffect } from 'react';

import { EventAvailable, StadiumOutlined } from '@mui/icons-material';
import { Card, CardContent, Container, Stack, Typography } from '@mui/material';

import Layout from '@/components/Layout';
import { Users } from '@/components/SvgIcons/Navigation';
import { InfoItem } from '@/model/info.model';
import colors from '@/styles/themes/colors';
import { useAuthStore } from '@/valtio/auth/auth.store';
import { getInfo } from '@/valtio/info/info.action';
import { useInfoStore } from '@/valtio/info/info.store';

const Admin = () => {
  const { user } = useAuthStore();
  const { info } = useInfoStore();

  useEffect(() => {
    getInfo();
  }, []);

  const infoItems: InfoItem[] = [
    { label: 'Objects', value: info?.numberOfObjects || 0, icon: StadiumOutlined },
    { label: 'Users', value: info?.numberOfUsers || 0, icon: Users },
    { label: 'Reservations', value: info?.numberOfReservations || 0, icon: EventAvailable },
  ];

  return (
    <Layout>
      <Container maxWidth={false}>
        <Typography component="p" variant="h1">
          Dobrodosli, {user?.firstname} {user?.lastName}
        </Typography>
        <Stack direction="row" spacing={2} pt={4}>
          {infoItems.map(({ label, value, icon: Icon }) => (
            <Card key={label} sx={{ maxWidth: 200, flex: 1, backgroundColor: colors.green50 }}>
              <CardContent>
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  color={colors.green300}
                >
                  {Icon && <Icon size="24px" />}
                  <Typography component="p" variant="h3" fontWeight={500}>
                    {label}
                  </Typography>
                  <Typography component="p" variant="h2" fontWeight={700}>
                    {value}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Layout>
  );
};

export default Admin;
