import { ISchedule, IScheduleService, ScheduleFilter } from '../../../schedule/schedule.service';

import { DentistServiceStub } from './dentist.stub';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { PatientServiceStub } from './patient.stub';

@Injectable()
export class ScheduleServiceStub implements IScheduleService {
    static SCHEDULES: ISchedule[] = [{
        id: 1,
        patient: PatientServiceStub.PATIENT,
        dentist: DentistServiceStub.DENTISTS[0],
        date: '',
        duration: 10,
        status: 0
    }];
    get(scheduleId: number): Observable<ISchedule> {
        return Observable.of(ScheduleServiceStub.SCHEDULES[0]);
    }
    getAll(filter?: ScheduleFilter): Observable<{ results: ISchedule[]; }> {
        return Observable.of({ results: ScheduleServiceStub.SCHEDULES });
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
