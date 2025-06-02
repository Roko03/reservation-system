export interface TableColumn {
  id: string;
  label: string;
  sortable: boolean;
}

export const userTableColumns: TableColumn[] = [
  { id: 'key', label: 'Broj', sortable: false },
  { id: 'user', label: 'Korisnik', sortable: false },
  { id: 'email', label: 'Email', sortable: false },
  { id: 'phoneNumber', label: 'Broj mobitela', sortable: false },
  { id: 'role', label: 'Uloga', sortable: false },
];

export const reservationTableColumns: TableColumn[] = [
  { id: 'key', label: 'Broj', sortable: false },
  { id: 'email', label: 'Email', sortable: false },
  { id: 'objectId', label: 'Objekt', sortable: false },
  { id: 'date', label: 'Datum rezervacije', sortable: false },
  { id: 'status', label: 'Status', sortable: false },
];

export const objectTableColumns: TableColumn[] = [
  { id: 'number', label: 'Broj', sortable: false },
  { id: 'name', label: 'Ime objekta', sortable: false },
  { id: 'location', label: 'Lokacija', sortable: false },
  { id: 'workTime', label: 'Radno vrijeme', sortable: false },
];

export const unavailablePeriodsTableColumns: TableColumn[] = [
  { id: 'key', label: 'Broj', sortable: false },
  { id: 'startDate', label: 'Datum od', sortable: false },
  { id: 'endDate', label: 'Datum do', sortable: false },
];
