import Layout from '@/components/Layout';
import MainHeroSection from '@/components/MainHeroSection';

import ReservationsList from './ReservationsList';

const MyReservations = () => (
  <Layout>
    <MainHeroSection title="Moje rezervacije" />
    <ReservationsList />
  </Layout>
);

export default MyReservations;
