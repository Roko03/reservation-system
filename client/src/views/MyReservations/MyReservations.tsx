import Layout from '@/components/Layout';
import MainHeroSection from '@/components/MainHeroSection';
import { toggleDeleteReservationModal, toggleUpdateReservationModal } from '@/valtio/auth/auth.actions';
import { useAuthStore } from '@/valtio/auth/auth.store';

import ReservationsList from './ReservationsList';
import DeleteReservationModal from './partials/DeleteReservationModal';
import UpdateReservationModal from './partials/UpdateReservationModal';

const MyReservations = () => {
  const { deleteReservationModalOpen, updateReservationModalOpen } = useAuthStore();

  return (
    <>
      <UpdateReservationModal isOpen={updateReservationModalOpen} onClose={toggleUpdateReservationModal} />
      <DeleteReservationModal isOpen={deleteReservationModalOpen} onClose={toggleDeleteReservationModal} />
      <Layout>
        <MainHeroSection title="Moje rezervacije" />
        <ReservationsList />
      </Layout>
    </>
  );
};

export default MyReservations;
