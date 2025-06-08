import { proxy, useSnapshot } from 'valtio';

import { ObjectModel } from '@/model/object.model';

interface ObjectsStore {
  objects: ObjectModel[];
  selectedObject?: ObjectModel;
  availableTimes?: string[];
  totalCount: number;
  isLoading: boolean;
  createObjectModalOpen: boolean;
  deleteObjectModalOpen: boolean;
  updateObjectModalOpen: boolean;
}

export const objectsStore = proxy<ObjectsStore>({
  objects: [],
  selectedObject: undefined,
  availableTimes: undefined,
  totalCount: 0,
  isLoading: false,
  createObjectModalOpen: false,
  deleteObjectModalOpen: false,
  updateObjectModalOpen: false,
});

export const useObjectStore = (): ObjectsStore => useSnapshot(objectsStore) as ObjectsStore;
