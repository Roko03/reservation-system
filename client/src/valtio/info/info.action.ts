import InfoService from '@/services/info.service';

import { infoStore } from './info.store';

export async function getInfo(): Promise<void> {
  infoStore.isLoading = true;

  const info = await InfoService.getInfo();

  infoStore.isLoading = false;
  infoStore.info = info;
}

export async function getInfoReservation(year?: number): Promise<void> {
  infoStore.isLoading = true;

  const reservation = await InfoService.getReservations(year);

  infoStore.isLoading = false;
  infoStore.reservations = reservation;
}
