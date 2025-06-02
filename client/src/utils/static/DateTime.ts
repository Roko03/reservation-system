import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import updateLocale from 'dayjs/plugin/updateLocale';

import { DATE_FORMAT_FULL, DATE_FORMAT_HR, DATE_FORMAT_TIME } from '@/config/date-time.config';

dayjs.extend(isoWeek);
dayjs.extend(isBetweenPlugin);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', { weekStart: 1 });

export default class DateTime {
  public static now = () => dayjs();

  public static date = (date: string) => dayjs(date);

  public static day = (date: Dayjs) => date.day();

  public static addWeek = (date: Dayjs) => date.add(1, 'week');

  public static subtractWeek = (date: Dayjs) => date.subtract(1, 'week');

  public static addMonth = (date: Dayjs) => date.add(1, 'month');

  public static subtractMonth = (date: Dayjs) => date.subtract(1, 'month');

  public static addYear = (date: Dayjs) => date.add(1, 'year');

  public static subtractYear = (date: Dayjs) => date.subtract(1, 'year');

  public static startOfWeek = (date: Dayjs) => date.startOf('isoWeek').format(DATE_FORMAT_FULL);

  public static endOfWeek = (date: Dayjs) => date.endOf('isoWeek').format(DATE_FORMAT_FULL);

  public static isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
    if (dayB == null) {
      return false;
    }

    return dayA.isSame(dayB, 'week');
  };

  public static isToday = (date: Dayjs) => dayjs().isSame(date, 'day');

  public static formatFull = (date: Dayjs) => date.format(DATE_FORMAT_FULL);

  public static formatHR = (date: Dayjs) => date.format(DATE_FORMAT_HR);

  public static startOfYear = (date: Dayjs) => date.startOf('year').format(DATE_FORMAT_FULL);

  public static endOfYear = (date: Dayjs) => date.endOf('year').format(DATE_FORMAT_FULL);

  public static startOfMonth = (date: Dayjs) => date.startOf('month').format(DATE_FORMAT_FULL);

  public static endOfMonth = (date: Dayjs) => date.endOf('month').format(DATE_FORMAT_FULL);

  public static formatTime = (date: Dayjs) => date.format(DATE_FORMAT_TIME);

  public static fromTimeString = (time: string): Dayjs => {
    const [hours, minutes] = time.split(':').map(Number);

    return dayjs().set('hour', hours).set('minute', minutes).set('second', 0).set('millisecond', 0);
  };
}
