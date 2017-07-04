import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { endOfWeek, getISOWeek } from 'date-fns';

export class LocalizedCalendarHeader extends CalendarDateFormatter {
    public weekViewTitle({ date, locale }: DateFormatterParams): string {
        const year: string = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
        const weekNumber: number = getISOWeek(endOfWeek(date));
        return `Semana ${weekNumber} de ${year}`;
    }

    public dayViewTitle({ date, locale }: DateFormatterParams): string {
        return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }
}
