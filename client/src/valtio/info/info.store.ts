import { proxy, useSnapshot } from 'valtio';

import { InfoModel } from '@/model/info.model';

interface InfoStore {
  info: InfoModel | null;
  isLoading: boolean;
}

export const infoStore = proxy<InfoStore>({
  info: null,
  isLoading: false,
});

export const useInfoStore = (): InfoStore => useSnapshot(infoStore) as InfoStore;
