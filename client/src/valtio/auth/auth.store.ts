import { proxy, useSnapshot } from 'valtio';

import { AuthKeys } from '@/config/constants.config';
import { ReservationModel } from '@/model/reservation.model';
import { UserModel } from '@/model/user.model';

interface AuthStore {
  user: UserModel | null;
  reservations: Omit<ReservationModel, 'user'>[];
  isLoading: boolean;
  totalCount: number;
  authenticating: boolean;
  token: string | null;
}

export const authStore = proxy<AuthStore>({
  user: null,
  reservations: [],
  isLoading: false,
  totalCount: 0,
  authenticating: false,
  token: localStorage.getItem(AuthKeys.TOKEN),
});

export const useAuthStore = (): AuthStore => useSnapshot(authStore);
