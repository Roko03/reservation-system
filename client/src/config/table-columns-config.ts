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
