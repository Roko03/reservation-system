import { proxy, useSnapshot } from 'valtio';

import { UserModel } from '@/model/user.model';

interface UsersStore {
  users: UserModel[];
  selectedUser?: UserModel;
  selectedRows: string[];
  totalCount: number;
  isLoading: boolean;
  createUserModalOpen: boolean;
  updateUserModalOpen: boolean;
  deleteUserModalOpen: boolean;
}

export const usersStore = proxy<UsersStore>({
  users: [],
  selectedUser: undefined,
  selectedRows: [],
  totalCount: 0,
  isLoading: false,
  createUserModalOpen: false,
  updateUserModalOpen: false,
  deleteUserModalOpen: false,
});

export const useUsersStore = (): UsersStore => useSnapshot(usersStore) as UsersStore;
