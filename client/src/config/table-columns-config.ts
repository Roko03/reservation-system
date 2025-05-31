export interface TableColumn {
  id: string;
  label: string;
  sortable: boolean;
}

export const userTableColumns: TableColumn[] = [
  { id: 'key', label: 'Broj', sortable: false },
  { id: 'user', label: 'Korisnik', sortable: false },
  { id: 'email', label: 'E-mail', sortable: false },
  { id: 'phoneNumber', label: 'Broj mobitela', sortable: false },
  { id: 'role', label: 'Uloga', sortable: false },
];
