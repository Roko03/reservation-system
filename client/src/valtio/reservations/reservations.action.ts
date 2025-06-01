import { ReservationFilters, ReservationStatus } from '@/model/reservation.model';
import ReservationsService from '@/services/reservations.service';

import { reservationsStore } from './reservations.store';

export async function getReservations(page?: number, filters?: ReservationFilters): Promise<void> {
  reservationsStore.isLoading = true;

  const { entities, totalCount } = await ReservationsService.getReservations(page, filters);

  reservationsStore.isLoading = false;
  reservationsStore.reservations = entities;
  reservationsStore.totalCount = totalCount;
}

export function clearSelectedReservation(): void {
  reservationsStore.selectedReservation = undefined;
}

export function findReservation(index: string): void {
  reservationsStore.selectedReservation = reservationsStore.reservations[+index];
}

export function isReservationEditable(index: number): boolean {
  const reservationStatus = reservationsStore.reservations[+index].status;

  return reservationStatus === ReservationStatus.PENDING;
}

export function toggleApproveReservationModal(isOpen?: boolean | React.MouseEvent): void {
  reservationsStore.approveReservationModalOpen =
    typeof isOpen === 'boolean' ? isOpen : !reservationsStore.approveReservationModalOpen;
}

export function toggleRejectReservationModal(isOpen?: boolean | React.MouseEvent): void {
  reservationsStore.rejectReservationModalOpen =
    typeof isOpen === 'boolean' ? isOpen : !reservationsStore.rejectReservationModalOpen;
}
