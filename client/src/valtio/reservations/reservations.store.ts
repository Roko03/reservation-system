import { proxy, useSnapshot } from 'valtio';

import { ReservationModel } from '@/model/reservation.model';

interface ReservationsStore {
  reservations: ReservationModel[];
  selectedReservation?: ReservationModel;
  totalCount: number;
  isLoading: boolean;
  approveReservationModalOpen: boolean;
  rejectReservationModalOpen: boolean;
}

export const reservationsStore = proxy<ReservationsStore>({
  reservations: [],
  selectedReservation: undefined,
  totalCount: 0,
  isLoading: false,
  approveReservationModalOpen: false,
  rejectReservationModalOpen: false,
});

export const useReservationStore = (): ReservationsStore => useSnapshot(reservationsStore) as ReservationsStore;
