import { proxy, useSnapshot } from 'valtio';

import { AuthKeys } from '@/config/constants.config';
import { UserModel, UserRole } from '@/model/user.model';

interface UserAuthModel extends Omit<UserModel, 'role'> {
  role: readonly UserRole[];
}

interface AuthStore {
  user: UserAuthModel | null;
  authenticating: boolean;
  token: string | null;
}

export const authStore = proxy<AuthStore>({
  user: null,
  authenticating: false,
  token: localStorage.getItem(AuthKeys.TOKEN),
});

export const useAuthStore = (): AuthStore => useSnapshot(authStore);
