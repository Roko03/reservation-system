import { useEffect, useMemo, useState } from 'react';
import { Calendar as BigCalendar, Views, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Box, Container } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

import Layout from '@/components/Layout';
import { PAGE_NUMBER } from '@/config/constants.config';
import { ReservationStatus } from '@/model/reservation.model';
import useQueryParams from '@/utils/hooks/useQueryParams';
import DateTime from '@/utils/static/DateTime';
import { getReservations } from '@/valtio/reservations/reservations.action';
import { useReservationStore } from '@/valtio/reservations/reservations.store';

import './big-calendar.scss';

dayjs.extend(timezone);

const djLocalizer = dayjsLocalizer(dayjs);

const EventComponent = ({ event }: { event: { title: string } }) => (
  <div style={{ whiteSpace: 'wrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.title}</div>
);

const Calendar = () => {
  const { pageNumber } = useQueryParams();
  const { reservations } = useReservationStore();

  const [currentDate, setCurrentDate] = useState<Dayjs>(DateTime.now());

  const handleNavigate = (date: Date) => {
    setCurrentDate(dayjs(date));
  };

  const events = useMemo(
    () =>
      reservations.map(r => {
        const timeString = dayjs(r.time).format('HH:mm');
        const start = dayjs(`${r.date.split('T')[0]}T${timeString}`)
          .add(-3600000)
          .toDate();
        const end = dayjs(start).add(1, 'hour').toDate();

        return {
          title: `${r.object.name} - ${r.user.email.split('@')[0]}`,
          start,
          end,
          allDay: false,
          resource: r,
        };
      }),
    [reservations]
  );

  useEffect(() => {
    const page = pageNumber - PAGE_NUMBER;

    const startDate = DateTime.startOfWeek(currentDate);
    const endDate = DateTime.endOfWeek(currentDate);

    getReservations(page, { dateFrom: startDate, dateTo: endDate, status: ReservationStatus.APPROVED });
  }, [currentDate, pageNumber]);

  return (
    <Layout isAdmin>
      <Container maxWidth={false}>
        <Box pt={12}>
          <BigCalendar
            localizer={djLocalizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={[Views.WEEK]}
            defaultView={Views.WEEK}
            aria-label="Reservation Calendar"
            popup
            onNavigate={handleNavigate}
            min={dayjs().hour(8).minute(0).toDate()}
            components={{
              event: EventComponent,
            }}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default Calendar;
