import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Admin from '@/views/Admin';
import Calendar from '@/views/Calendar';
import Home from '@/views/Home';
import MyReservations from '@/views/MyReservations';
import Object from '@/views/Object';
import Objects from '@/views/Objects';
import Profile from '@/views/Profile';
import Reservation from '@/views/Reservation';
import Reservations from '@/views/Reservations';
import User from '@/views/User';
import Users from '@/views/Users';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="my-reservations" element={<MyReservations />} />
      <Route path="objects">
        <Route index element={<Objects />} />
        <Route path=":id" element={<Object />} />
      </Route>
      <Route path="reservations">
        <Route index element={<Reservations />} />
        <Route path=":id" element={<Reservation />} />
      </Route>
      <Route path="admin">
        <Route index element={<Admin />} />
        <Route path="objects">
          <Route index element={<Objects />} />
          <Route path=":id" element={<Object />} />
        </Route>
        <Route path="reservations">
          <Route index element={<Reservations />} />
          <Route path=":id" element={<Reservation />} />
        </Route>
        <Route path="users">
          <Route index element={<Users />} />
          <Route path=":id" element={<User />} />
        </Route>
        <Route path="calendar" element={<Calendar />} />
      </Route>
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
