import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppRoute from '@/components/Auth/AppRoute';
import Loader from '@/components/Loader';
import ProtectedLayout from '@/components/ProtectedLayout';
import { UserRoleName } from '@/model/user.model';
import Error404 from '@/views/Error404';

const Home = lazy(() => import('@/views/Home'));
const SignUp = lazy(() => import('@/views/SignUp'));
const Verify = lazy(() => import('@/views/Verify'));
const Login = lazy(() => import('@/views/Login'));
const Admin = lazy(() => import('@/views/Admin'));
const Calendar = lazy(() => import('@/views/Calendar'));
const MyReservations = lazy(() => import('@/views/MyReservations'));
const Objects = lazy(() => import('@/views/Objects'));
const Profile = lazy(() => import('@/views/Profile'));
const Reservations = lazy(() => import('@/views/Reservations'));
const Users = lazy(() => import('@/views/Users'));

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AppRoute variant="anonymous" component={<Login />} />} />
        <Route path="/signup" element={<AppRoute variant="anonymous" component={<SignUp />} />} />
        <Route path="/verify/:id" element={<AppRoute variant="anonymous" component={<Verify />} />} />
        <Route path="objects" element={<Objects />}>
          <Route path=":id" />
        </Route>
        <Route
          path="profile"
          element={<AppRoute variant="protected" accessLevel={[UserRoleName.USER]} component={<Profile />} />}
        />
        <Route
          path="my-reservations"
          element={<AppRoute variant="protected" accessLevel={[UserRoleName.USER]} component={<MyReservations />} />}
        />
        <Route
          path="admin"
          element={
            <AppRoute
              variant="protected"
              accessLevel={[UserRoleName.SUPERADMIN, UserRoleName.ADMIN]}
              component={<ProtectedLayout />}
            />
          }
        >
          <Route index element={<Admin />} />
          <Route path="objects" element={<Objects />}>
            <Route path=":id" />
          </Route>
          <Route path="reservations">
            <Route index element={<Reservations />} />
          </Route>
          <Route path="users">
            <Route index element={<Users />} />
          </Route>
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
