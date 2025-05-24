import React from 'react';

import { ThemeProvider } from '@mui/material';

import AppRouter from '@/routers/AppRouter';

import theme from './styles/themes';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
);

export default App;
