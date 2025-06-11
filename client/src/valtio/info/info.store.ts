import { proxy, useSnapshot } from 'valtio';

import { InfoModel, InfoReservationModel } from '@/model/info.model';

interface InfoStore {
  info: InfoModel | null;
  reservations: InfoReservationModel | null;
  isLoading: boolean;
}

export const infoStore = proxy<InfoStore>({
  info: null,
  reservations: null,
  isLoading: false,
});

export const useInfoStore = (): InfoStore => useSnapshot(infoStore) as InfoStore;
