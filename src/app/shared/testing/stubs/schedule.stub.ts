import { format, subMonths } from 'date-fns';
import { IScheduleService, ISchedule, ScheduleFilter, IAttendanceData } from '../../../schedule/schedule.service';
import { ScheduleDatabase } from '../databases/schedule.database';
import { Observable, of } from 'rxjs';

export class ScheduleServiceStub implements IScheduleService {
    scheduleDatabase = new ScheduleDatabase();
    get(_scheduleId: number): Observable<ISchedule> {
        return of(this.scheduleDatabase.get());
    }
    getAll(_filter?: ScheduleFilter): Observable<{ results: ISchedule[]; }> {
        return of({ results: this.scheduleDatabase.getMany(100) });
    }
    create(_schedule: ISchedule): Observable<any> {
        throw new Error('Method not implemented.');
    }
    update(_schedule: ISchedule): Observable<any> {
        throw new Error('Method not implemented.');
    }
    save(_schedule: ISchedule): Observable<any> {
        throw new Error('Method not implemented.');
    }
    getAttendanceData(_referenceDate?: Date): Observable<IAttendanceData> {
        const date = new Date();
        const d1 = format(date, 'YYYY-MM-01');
        const d2 = format(subMonths(date, 1), 'YYYY-MM-01');
        const d3 = format(subMonths(date, 2), 'YYYY-MM-01');
        return of({
            [d1]: {
                attendances: 10,
                absences: 10,
                cancellations: 10,
                ratio: 0.3333333
            },
           [d2]: {
                attendances: 70,
                absences: 20,
                cancellations: 10,
                ratio: 0.7
            },
            [d3]: {
                attendances: 0,
                absences: 3,
                cancellations: 10,
                ratio: 0
            }
        });
    }
}
