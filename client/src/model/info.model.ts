import { ElementType } from 'react';

export interface InfoModel {
  numberOfObjects: number;
  numberOfUsers: number;
  numberOfReservations: number;
}

export interface InfoItem {
  label: string;
  value: number;
  icon?: ElementType;
}
