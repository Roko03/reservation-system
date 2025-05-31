import React from 'react';
import { Navigate } from 'react-router-dom';

import { Box } from '@mui/material';

import Layout from '@/components/Layout';
import { UserRoleName } from '@/model/user.model';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtio/auth/auth.store';

const Home: React.FC = () => {
  const { user } = useAuthStore();

  if (user && roleGuard(user.role, [UserRoleName.ADMIN, UserRoleName.SUPERADMIN])) {
    return <Navigate to="/admin" />;
  }

  return (
    <Layout>
      <Box>Main</Box>
    </Layout>
  );
};

export default Home;
