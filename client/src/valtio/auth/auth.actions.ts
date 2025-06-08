import { UserModel } from '@/model/user.model';
import MeService from '@/services/me.service';

import { authStore } from './auth.store';

export const setAuthenticating = (authenticating: boolean): void => {
  authStore.authenticating = authenticating;
};

export async function getUserReservations(page?: number): Promise<void> {
  authStore.isLoading = true;

  const { entities, totalCount } = await MeService.getProfileReservations(page);

  authStore.isLoading = false;
  authStore.reservations = entities;
  authStore.totalCount = totalCount;
}

export const setUser = (user: UserModel | null): void => {
  authStore.user = user;
};

export const setToken = (token: string | null): void => {
  authStore.token = token;
};

export function clearSelectedReservation(): void {
  authStore.selectedReservation = undefined;
}

export function toggleUpdateReservationModal(isOpen?: boolean | React.MouseEvent): void {
  authStore.updateReservationModalOpen = typeof isOpen === 'boolean' ? isOpen : !authStore.updateReservationModalOpen;
}

export function toggleDeleteReservationModal(isOpen?: boolean | React.MouseEvent): void {
  authStore.deleteReservationModalOpen = typeof isOpen === 'boolean' ? isOpen : !authStore.deleteReservationModalOpen;
}

export function findReservation(index: string): void {
  authStore.selectedReservation = authStore.reservations[+index];
}
