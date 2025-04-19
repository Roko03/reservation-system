import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/views/Home';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
