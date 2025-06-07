import { UserModel } from '@/model/user.model';

import { authStore } from './auth.store';


export const setAuthenticating = (authenticating: boolean): void => {
  authStore.authenticating = authenticating;
};

export const setUser = (user: UserModel | null): void => {
  authStore.user = user;
};

export const setToken = (token: string | null): void => {
  authStore.token = token;
};
