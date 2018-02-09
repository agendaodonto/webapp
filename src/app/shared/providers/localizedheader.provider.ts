import * as moment from 'moment';

import { CalendarMomentDateFormatter, DateFormatterParams } from 'angular-calendar';
import { endOfWeek, getISOWeek } from 'date-fns';

export class LocalizedCalendarHeader extends CalendarMomentDateFormatter {

    public weekViewTitle({ date, locale }: DateFormatterParams): string {
        const year: string = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
        const weekNumber: number = getISOWeek(endOfWeek(date));
        return `Semana ${weekNumber} de ${year}`;
    }

    public dayViewTitle({ date, locale }: DateFormatterParams): string {
        return moment(date).locale(locale).format('DD [de] MMMM [de] YYYY');
    }
}
