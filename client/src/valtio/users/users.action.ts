import UsersService from '@/services/users.service';

import { usersStore } from './users.store';

export async function getUsers(page?: number, search?: string): Promise<void> {
  usersStore.isLoading = true;

  const { entities, totalCount } = await UsersService.getUsers(page, search);

  usersStore.isLoading = false;
  usersStore.users = entities;
  usersStore.totalCount = totalCount;
}

export async function getSelectedUser(id: string): Promise<void> {
  const response = await UsersService.getUser(id);

  usersStore.selectedUser = response!;
}

export function clearSelectedUser(): void {
  usersStore.selectedUser = undefined;
}

export function toggleUpdateUserModal(isOpen?: boolean | React.MouseEvent): void {
  usersStore.updateUserModalOpen = typeof isOpen === 'boolean' ? isOpen : !usersStore.updateUserModalOpen;
}

export function toggleDeleteUserModal(isOpen?: boolean | React.MouseEvent): void {
  usersStore.deleteUserModalOpen = typeof isOpen === 'boolean' ? isOpen : !usersStore.deleteUserModalOpen;
}

export function findUser(index: string): void {
  usersStore.selectedUser = usersStore.users[+index];
}
