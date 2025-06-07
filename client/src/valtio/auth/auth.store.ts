import { proxy, useSnapshot } from 'valtio';

import { AuthKeys } from '@/config/constants.config';
import { UserModel } from '@/model/user.model';

interface AuthStore {
  user: UserModel | null;
  authenticating: boolean;
  token: string | null;
}

export const authStore = proxy<AuthStore>({
  user: null,
  authenticating: false,
  token: localStorage.getItem(AuthKeys.TOKEN),
});

export const useAuthStore = (): AuthStore => useSnapshot(authStore);
