import React from 'react';

import {
  Table as MuiTable,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import cx from 'clsx';

import EmptyState from '@/components/EmptyState';
import MeatballsMenu from '@/components/MeatballsMenu';
import { SortDirection } from '@/config/constants.config';
import { TableColumn } from '@/config/table-columns-config';

import styles from './Table.module.scss';

interface TableProps {
  columns: TableColumn[];
  rows: ({ key: string } & Record<string, React.ReactNode>)[];
  rowActions?: (itemIndex: number) => React.ReactNode;
  onRowClick?: React.MouseEventHandler<HTMLTableRowElement>;
  showSkeleton?: boolean;
  sortDirection?: SortDirection;
  sortBy?: string;
  onSort?: (sortBy: string, sortDirection: SortDirection) => void;
  noResultsMessage?: string;
}

const Table = ({
  columns,
  rows,
  rowActions,
  onRowClick,
  showSkeleton,
  sortDirection,
  sortBy,
  onSort,
  noResultsMessage = 'Nema sadrzaja',
}: TableProps) => {
  const noResults = !rows.length && !showSkeleton;

  const handleSort = (id: string) => {
    if (!onSort) {
      return;
    }

    const isAsc = sortBy === id && sortDirection === 'asc';
    const direction = isAsc ? 'desc' : 'asc';

    onSort(id, direction);
  };

  return (
    <TableContainer className={styles.container}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map(({ id, label, sortable }) => (
              <TableCell key={id} sortDirection={sortBy === id ? sortDirection : false}>
                {sortable && sortDirection ? (
                  <TableSortLabel
                    active={sortBy === id}
                    direction={sortBy === id ? sortDirection : 'asc'}
                    onClick={() => handleSort(id)}
                  >
                    <Typography variant="body2">{label}</Typography>
                  </TableSortLabel>
                ) : (
                  <Typography variant="body2">{label}</Typography>
                )}
              </TableCell>
            ))}
            {rowActions && <TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <React.Fragment key={row.key}>
              <TableRow data-id={row.key} onClick={onRowClick} className={cx({ [styles.clickable]: onRowClick })}>
                {columns.map(column => {
                  const content = row[column.id];
                  const cell =
                    typeof content === 'string' ? <Typography variant="body2">{content}</Typography> : content;

                  return (
                    <TableCell key={column.id}>
                      {showSkeleton ? <Skeleton variant="text">{cell}</Skeleton> : cell}
                    </TableCell>
                  );
                })}
                {rowActions && (
                  <TableCell align="right">
                    <MeatballsMenu>
                      {typeof rowActions === 'function' ? rowActions(rowIndex) : rowActions}
                    </MeatballsMenu>
                  </TableCell>
                )}
              </TableRow>
            </React.Fragment>
          ))}
          {noResults && (
            <TableRow>
              <TableCell colSpan={12} classes={{ root: styles.root }} className={styles.tableCell}>
                <EmptyState isOpen message={noResultsMessage} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
