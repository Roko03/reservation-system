import { useEffect, useState } from 'react';

import { Chip, Container, Paper, SelectChangeEvent, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import Autocomplete from '@/components/Autocomplete';
import DateDisplay from '@/components/DateDisplay';
import DatePickerButton from '@/components/DatePickerButton';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Select from '@/components/Select';
import Table from '@/components/Table';
import { PAGE_NUMBER, PAGE_SIZE } from '@/config/constants.config';
import { reservationTableColumns } from '@/config/table-columns-config';
import { ObjectModel } from '@/model/object.model';
import {
  RESERVATION_STATUS_ARRAY,
  RESERVATION_STATUS_LABEL_MAP,
  ReservationFilters,
  ReservationStatus,
} from '@/model/reservation.model';
import ObjectsService from '@/services/objects.service';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import useQueryParams from '@/utils/hooks/useQueryParams';
import DateTime from '@/utils/static/DateTime';
import formatTime from '@/utils/static/formatTime';
import {
  getReservations,
  toggleApproveReservationModal,
  toggleRejectReservationModal,
} from '@/valtio/reservations/reservations.action';
import { useReservationStore } from '@/valtio/reservations/reservations.store';

import ApproveReservationaModal from './partials/ApproveReservationaModal';
import RejectReservationaModal from './partials/RejectReservationaModal';
import useReservationView from './useReservationView';

const Reservations = () => {
  const { pageNumber, handlePageChange } = useQueryParams();
  const { isBelowLg, isMobile } = useBreakpoint();
  const { renderRowActions } = useReservationView();

  const { isLoading, reservations, totalCount, approveReservationModalOpen, rejectReservationModalOpen } =
    useReservationStore();
  const [objects, setObjects] = useState<ObjectModel[] | null>(null);
  const [searchString, setSearchString] = useState<string>('');

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(DateTime.now());
  const [selectedObjectId, setSelectedObjectId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | null>(null);

  const handleStatusSelect = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as ReservationStatus);
  };

  const handleDateChange = (value: Dayjs | null) => {
    setSelectedDate(value);
  };

  const handleInputChange = (value: string) => {
    setSearchString(value);
  };

  useEffect(() => {
    const page = pageNumber - PAGE_NUMBER;

    const filters: ReservationFilters = {};

    if (selectedDate) {
      filters.dateFrom = DateTime.formatFull(selectedDate.startOf('month'));
      filters.dateTo = DateTime.formatFull(selectedDate.endOf('month'));
    }

    if (selectedObjectId) {
      filters.objectId = selectedObjectId;
    }

    if (selectedStatus) {
      filters.status = selectedStatus;
    }

    if (selectedStatus) {
      getReservations(page, filters);
    }

    getReservations(page, filters);
  }, [pageNumber, selectedDate, selectedObjectId, selectedStatus]);

  useEffect(() => {
    (async (): Promise<void> => {
      const { entities } = await ObjectsService.getObjects(0, searchString);

      setObjects(entities);
    })();
  }, [searchString]);

  return (
    <>
      <ApproveReservationaModal isOpen={approveReservationModalOpen} onClose={toggleApproveReservationModal} />
      <RejectReservationaModal isOpen={rejectReservationModalOpen} onClose={toggleRejectReservationModal} />
      <Layout>
        <Container maxWidth={false}>
          <Paper elevation={0}>
            <Stack
              direction={{ md: 'row' }}
              justifyContent={{ md: 'space-between' }}
              alignItems={{ md: 'center' }}
              mb={1.5}
              gap={1.5}
              pt={12}
            >
              <Stack
                direction={isBelowLg ? 'column' : 'row'}
                spacing={2}
                pt={isBelowLg ? 2 : 0}
                width={isBelowLg ? '100%' : 'auto'}
              >
                <Stack width={isMobile ? '100%' : 320}>
                  <Autocomplete
                    value={selectedObjectId}
                    options={objects?.map(object => ({ id: `${object.id}`, label: `${object.name}` })) || []}
                    onChange={setSelectedObjectId}
                    onInputChange={handleInputChange}
                    TextFieldProps={{
                      placeholder: 'Objekt',
                    }}
                  />
                </Stack>
                <Stack width={isMobile ? '100%' : 320}>
                  <Select
                    value={selectedStatus || ''}
                    onChange={handleStatusSelect}
                    options={[
                      { id: '', label: 'All' },
                      ...RESERVATION_STATUS_ARRAY.map(status => ({
                        id: status,
                        label: RESERVATION_STATUS_LABEL_MAP[status as ReservationStatus],
                      })),
                    ]}
                    placeholder="Status"
                  />
                </Stack>
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap={1}>
                <DateDisplay date={selectedDate?.format('MMMM YYYY')} />
                <DatePickerButton value={selectedDate} onChange={handleDateChange} views={['month']} />
              </Stack>
            </Stack>
            <Table
              rowActions={renderRowActions}
              showSkeleton={isLoading}
              columns={reservationTableColumns}
              rows={reservations.map((reservation, index) => ({
                key: `#${index + 1}`,
                email: reservation.user.email,
                objectId: reservation.object.name,
                date: `${DateTime.formatHR(dayjs(reservation.date))} - ${formatTime(reservation.time)}`,
                status: (
                  <Chip
                    color={
                      // eslint-disable-next-line no-nested-ternary
                      RESERVATION_STATUS_LABEL_MAP[reservation.status] === 'Odbijena'
                        ? 'error'
                        : RESERVATION_STATUS_LABEL_MAP[reservation.status] === 'Prihvaceno'
                          ? 'success'
                          : 'warning'
                    }
                    label={RESERVATION_STATUS_LABEL_MAP[reservation.status]}
                  />
                ),
              }))}
            />
            <Pagination page={pageNumber + 1} onChange={handlePageChange} count={Math.ceil(totalCount / PAGE_SIZE)} />
          </Paper>
        </Container>
      </Layout>
    </>
  );
};

export default Reservations;
