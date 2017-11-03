import { IScheduleService, ScheduleFilter, ISchedule } from 'app/schedule/schedule.service';
import { Observable } from 'rxjs/Observable';
import { ScheduleDatabase } from 'app/shared/testing/databases/schedule.database';

export class ScheduleServiceStub implements IScheduleService {
    scheduleDatabase = new ScheduleDatabase();
    get(scheduleId: number): Observable<ISchedule> {
        return Observable.of(this.scheduleDatabase.get())
    }
    getAll(filter?: ScheduleFilter): Observable<{ results: ISchedule[]; }> {
        return Observable.of({ results: this.scheduleDatabase.getMany(100) })
    }
    create(schedule: ISchedule): Observable<any> {
        throw new Error('Method not implemented.');
    }
    update(schedule: ISchedule): Observable<any> {
        throw new Error('Method not implemented.');
    }
    save(schedule: ISchedule): Observable<any> {
        throw new Error('Method not implemented.');
    }

}
