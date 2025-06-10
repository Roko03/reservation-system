import { UnavailablePeriod } from './unvailable.model';

export interface ObjectModel {
  id: string;
  name: string;
  location: string;
  image?: string | null;
  workTimeFrom: string;
  workTimeTo: string;
  type: string;
  terrainType: string;
  unavailablePeriods: UnavailablePeriod[];
  createdAt?: string;
  updatedAt?: string;
}
