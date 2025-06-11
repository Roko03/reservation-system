import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import ContactSection from '@/components/ContactSection';
import Layout from '@/components/Layout';
import MainHeroSection from '@/components/MainHeroSection';
import ObjectCard from '@/components/ObjectCard';
import { USER_PAGE_SIZE } from '@/config/constants.config';
import { UserRoleName } from '@/model/user.model';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtio/auth/auth.store';
import { getObjects } from '@/valtio/objects/objects.action';
import { useObjectStore } from '@/valtio/objects/objects.store';

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const { objects } = useObjectStore();

  useEffect(() => {
    getObjects(USER_PAGE_SIZE, 0);
  }, []);

  if (user && roleGuard(user.role, [UserRoleName.ADMIN, UserRoleName.SUPERADMIN])) {
    return <Navigate to="/admin" />;
  }

  return (
    <Layout>
      <MainHeroSection title="DOBRODOŠLI" description="Pronađite dostupne termine" />
      <Container component="section" maxWidth={false}>
        <Grid container spacing={2} py={4}>
          {objects.slice(0, 6).map(object => (
            <Grid key={object.id} size={{ xs: 12, md: 6, xl: 4 }} justifyContent="center">
              <ObjectCard {...object} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <ContactSection />
    </Layout>
  );
};

export default Home;
