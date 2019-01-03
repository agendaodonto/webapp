import { BaseFilter, BaseService } from '../shared/services/base.service';

import { IDentist } from '../shared/services/dentist.service';
import { IPatient } from '../patient/patient.service';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPagedResponse } from '../shared/interceptors/responses';

@Injectable()
export class ScheduleService extends BaseService implements IScheduleService {

    constructor(private http: HttpClient) {
        super();
    }

    get(scheduleId: number): Observable<ISchedule> {
        return this.http.get<ISchedule>(this.url(['schedules', scheduleId]));
    }

    getAll(scheduleFilter?: ScheduleFilter): Observable<IPagedResponse<ISchedule>> {
        const filter = scheduleFilter ? scheduleFilter : new ScheduleFilter();
        return this.http.get<IPagedResponse<ISchedule>>(this.url(['schedules']), filter.getFilter());
    }

    create(schedule: ISchedule): Observable<any> {
        const tmpSchedule: any = schedule;
        tmpSchedule.dentist = schedule.dentist.id;
        tmpSchedule.patient = schedule.patient.id;
        return this.http.post<ISchedule>(this.url(['schedules']), JSON.stringify(tmpSchedule));
    }

    update(schedule: ISchedule): Observable<any> {
        const tmpSchedule: any = schedule;
        tmpSchedule.dentist = schedule.dentist.id;
        tmpSchedule.patient = schedule.patient.id;
        return this.http.put<ISchedule>(this.url(['schedules', schedule.id]), JSON.stringify(tmpSchedule));
    }

    remove(schedule: ISchedule): Observable<any> {
        return this.http.delete(this.url(['schedules', schedule.id]));
    }

    save(schedule: ISchedule): Observable<any> {
        if (schedule.id) {
            return this.update(schedule);
        } else {
            return this.create(schedule);
        }
    }

    updateNotificationStatus(schedule: ISchedule, newStatus: number): Observable<any> {
        const payload = {
            new_status: newStatus
        };
        return this.http.post(this.url(['schedules', schedule.id, 'notification']), JSON.stringify(payload));
    }

    getAttendanceData(referenceDate?: Date): Observable<IAttendanceData> {
        let params = new HttpParams();
        if (referenceDate) {
            params = params.set('date', format(referenceDate, 'YYYY-MM-DD'));
        }
        return this.http.get<IAttendanceData>(this.url(['schedules', 'attendance']), { params: params });
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
    };
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
    notification_status: string;
}
