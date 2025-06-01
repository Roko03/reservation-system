import { proxy, useSnapshot } from 'valtio';

import { UserModel } from '@/model/user.model';

interface UsersStore {
  users: UserModel[];
  selectedUser?: UserModel;
  totalCount: number;
  isLoading: boolean;
  updateUserModalOpen: boolean;
  deleteUserModalOpen: boolean;
}

export const usersStore = proxy<UsersStore>({
  users: [],
  selectedUser: undefined,
  totalCount: 0,
  isLoading: false,
  updateUserModalOpen: false,
  deleteUserModalOpen: false,
});

export const useUsersStore = (): UsersStore => useSnapshot(usersStore) as UsersStore;
