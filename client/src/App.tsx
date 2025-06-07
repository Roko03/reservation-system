import React from 'react';

import { ThemeProvider } from '@mui/material';

import Toast from '@/components/Toast';
import AppRouter from '@/routers/AppRouter';
import theme from '@/styles/themes';

import useAuth from './utils/hooks/useAuth';

const App: React.FC = () => {
  useAuth();

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
      <Toast />
    </ThemeProvider>
  );
};

export default App;
