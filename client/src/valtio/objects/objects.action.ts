import ObjectsService from '@/services/objects.service';
import { GetAvailableTimesFormValues } from '@/types/available-time.type';

import { objectsStore } from './objects.store';

export async function getObjects(page?: number, search?: string, selectedCity?: string): Promise<void> {
  objectsStore.isLoading = true;

  const { entities, totalCount } = await ObjectsService.getObjects(page, search, selectedCity);

  objectsStore.isLoading = false;
  objectsStore.objects = entities;
  objectsStore.totalCount = totalCount;
}

export async function getSelectedObject(id: string): Promise<void> {
  const response = await ObjectsService.getObject(id);

  objectsStore.selectedObject = response!;
}

export async function getAvailableTimeObject(payload: GetAvailableTimesFormValues): Promise<void> {
  const { entities } = await ObjectsService.getAvailableTimes(payload);

  objectsStore.availableTimes = entities;
}

export function toggleCreateObjectModal(isOpen?: boolean | React.MouseEvent): void {
  objectsStore.createObjectModalOpen = typeof isOpen === 'boolean' ? isOpen : !objectsStore.createObjectModalOpen;
}

export function clearSelectedObject(): void {
  objectsStore.selectedObject = undefined;
}

export function clearSelectedAvailableTimeObject(): void {
  objectsStore.availableTimes = undefined;
}

export function toggleUpdateObjectModal(isOpen?: boolean | React.MouseEvent): void {
  objectsStore.updateObjectModalOpen = typeof isOpen === 'boolean' ? isOpen : !objectsStore.updateObjectModalOpen;
}

export function toggleDeleteObjectModal(isOpen?: boolean | React.MouseEvent): void {
  objectsStore.deleteObjectModalOpen = typeof isOpen === 'boolean' ? isOpen : !objectsStore.deleteObjectModalOpen;
}

export function findObject(index: string): void {
  objectsStore.selectedObject = objectsStore.objects[+index];
}
