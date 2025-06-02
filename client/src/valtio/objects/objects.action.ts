import ObjectsService from '@/services/objects.service';

import { objectsStore } from './objects.store';

export async function getObjects(page?: number, search?: string): Promise<void> {
  objectsStore.isLoading = true;

  const { entities, totalCount } = await ObjectsService.getObjects(page, search);

  objectsStore.isLoading = false;
  objectsStore.objects = entities;
  objectsStore.totalCount = totalCount;
}

export async function getSelectedObject(id: string): Promise<void> {
  const response = await ObjectsService.getObject(id);

  objectsStore.selectedObject = response!;
}

export function toggleCreateObjectModal(isOpen?: boolean | React.MouseEvent): void {
  objectsStore.createObjectModalOpen = typeof isOpen === 'boolean' ? isOpen : !objectsStore.createObjectModalOpen;
}

export function clearSelectedObject(): void {
  objectsStore.selectedObject = undefined;
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
