import { IScheduleService, ScheduleFilter, ISchedule } from 'app/schedule/schedule.service';
import { Observable } from 'rxjs/Observable';
import { ScheduleDatabase } from 'app/shared/testing/databases/schedule.database';

export class ScheduleServiceStub implements IScheduleService {
    scheduleDatabase = new ScheduleDatabase();
    get(_scheduleId: number): Observable<ISchedule> {
        return Observable.of(this.scheduleDatabase.get())
    }
    getAll(_filter?: ScheduleFilter): Observable<{ results: ISchedule[]; }> {
        return Observable.of({ results: this.scheduleDatabase.getMany(100) })
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

}
