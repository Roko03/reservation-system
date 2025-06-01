import { proxy, useSnapshot } from 'valtio';

import { ReservationModel } from '@/model/reservation.model';

interface ObjectsStore {
  objects: ReservationModel[];
  selectedObject?: ReservationModel;
  totalCount: number;
  isLoading: boolean;
  createObjectModalOpen: boolean;
  deleteObjectModalOpen: boolean;
  updateObjectModalOpen: boolean;
}

export const objectsStore = proxy<ObjectsStore>({
  objects: [],
  selectedObject: undefined,
  totalCount: 0,
  isLoading: false,
  createObjectModalOpen: false,
  deleteObjectModalOpen: false,
  updateObjectModalOpen: false,
});

export const useObjectStore = (): ObjectsStore => useSnapshot(objectsStore) as ObjectsStore;
