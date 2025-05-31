import { proxy, useSnapshot } from 'valtio';

import { AuthKeys } from '@/config/constants.config';
import { UserModel, UserRoleName } from '@/model/user.model';

interface AuthStore {
  user: UserModel | null;
  authenticating: boolean;
  token: string | null;
}

export const authStore = proxy<AuthStore>({
  user: {
    id: '123',
    firstname: 'roko',
    lastName: 'ponjarac',
    email: 'roko@gmail.com',
    phoneNumber: '',
    profileImage: '/',
    role: UserRoleName.ADMIN,
  },
  authenticating: false,
  token: localStorage.getItem(AuthKeys.TOKEN),
});

export const useAuthStore = (): AuthStore => useSnapshot(authStore);
