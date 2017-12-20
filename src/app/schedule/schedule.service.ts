import { BaseFilter, BaseService } from '../shared/services/base.service';

import { AuthHttp, IPagedResponse } from '../shared/auth_http';
import { IDentist } from '../shared/services/dentist.service';
import { IPatient } from '../patient/patient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { format } from 'date-fns';

@Injectable()
export class ScheduleService extends BaseService implements IScheduleService {

    constructor(private http: AuthHttp) {
        super();
    }

    get(scheduleId: number): Observable<ISchedule> {
        return this.http.get(this.url(['schedules', scheduleId])).map(data => data.json());
    }

    getAll(scheduleFilter?: ScheduleFilter): Observable<IPagedResponse<ISchedule>> {
        const filter = scheduleFilter ? scheduleFilter : new ScheduleFilter();
        return this.http.get(this.url(['schedules']), filter.getFilter()).map(data => data.json());
    }

    create(schedule: ISchedule): Observable<any> {
        const tmpSchedule: any = schedule;
        tmpSchedule.dentist = schedule.dentist.id;
        tmpSchedule.patient = schedule.patient.id;
        return this.http.post(this.url(['schedules']), JSON.stringify(tmpSchedule)).map(d => d.json());
    }

    update(schedule: ISchedule): Observable<any> {
        const tmpSchedule: any = schedule;
        tmpSchedule.dentist = schedule.dentist.id;
        tmpSchedule.patient = schedule.patient.id;
        return this.http.put(this.url(['schedules', schedule.id]), JSON.stringify(tmpSchedule)).map(d => d.json());
    }

    remove(schedule: ISchedule): Observable<any> {
        return this.http.remove(this.url(['schedules', schedule.id])).map(d => d.json());
    }

    save(schedule: ISchedule): Observable<any> {
        if (schedule.id) {
            return this.update(schedule);
        } else {
            return this.create(schedule);
        }
    }

    getAttendanceData(referenceDate?: Date): Observable<IAttendanceData> {
        const requestOptions = new RequestOptions()
        const params = new URLSearchParams()
        params.set('date', format(referenceDate, 'YYYY-MM-DD'))
        requestOptions.params = params;
        return this.http.get(this.url(['schedules', 'attendance'])).map(d => d.json());
    }

}

export interface IScheduleService {
    get(scheduleId: number): Observable<ISchedule>;
    getAll(filter?: ScheduleFilter): Observable<{ results: ISchedule[] }>;
    create(schedule: ISchedule): Observable<any>;
    update(schedule: ISchedule): Observable<any>;
    save(schedule: ISchedule): Observable<any>;
    getAttendanceData(referenceDate?: Date): Observable<IAttendanceData>;
}

export interface IAttendanceData {
    [key: string]: {
        absences: number,
        attendances: number,
        cancellations: number,
        ratio: number;
    }
}

export enum ScheduleStatus {
    Pending = 0,
    ShownUp = 1,
    Missed = 2,
    Canceled = 3
}

export class ScheduleFilter extends BaseFilter {
    constructor() {
        super();
        this.fields.push(
            { name: 'startDate', mapsTo: 'date_0', value: null, type: 'filter' },
            { name: 'endDate', mapsTo: 'date_1', value: null, type: 'filter' },
            { name: 'status', mapsTo: 'status', value: null, type: 'filter' },
        );
        this.setFilterValue('orderBy', 'date');
    }

}


export interface ISchedule {
    id: number;
    patient: IPatient;
    dentist: IDentist;
    date: string;
    duration: number;
    status: number;
}
