import { proxy, useSnapshot } from 'valtio';

import { AuthKeys } from '@/config/constants.config';
import { ReservationModel } from '@/model/reservation.model';
import { UserModel } from '@/model/user.model';

interface AuthStore {
  user: UserModel | null;
  reservations: Omit<ReservationModel, 'user'>[];
  selectedReservation?: Omit<ReservationModel, 'user'>;
  isLoading: boolean;
  totalCount: number;
  authenticating: boolean;
  token: string | null;
  deleteReservationModalOpen: boolean;
  updateReservationModalOpen: boolean;
}

export const authStore = proxy<AuthStore>({
  user: null,
  reservations: [],
  selectedReservation: undefined,
  isLoading: false,
  totalCount: 0,
  authenticating: false,
  token: localStorage.getItem(AuthKeys.TOKEN),
  deleteReservationModalOpen: false,
  updateReservationModalOpen: false,
});

export const useAuthStore = (): AuthStore => useSnapshot(authStore);
