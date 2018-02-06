import { IPagedResponse } from 'app/shared/interceptors/responses';
import { BaseFilter, BaseService } from '../shared/services/base.service';
import { IClinic } from '../clinic/clinic.service';
import { ISchedule } from '../schedule/schedule.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ScheduleFilter } from 'app/schedule/schedule.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PatientService extends BaseService implements IPatientService {

    constructor(private http: HttpClient) {
        super();
    }

    getAll(patientFilter?: PatientFilter): Observable<IPagedResponse<IPatient>> {
        const filter = patientFilter ? patientFilter.getFilter() : new PatientFilter().getFilter();
        return this.http.get<IPagedResponse<IPatient>>(this.url(['patients']), filter);
    }

    get(patientId: number): Observable<IPatient> {
        return this.http.get<IPatient>(this.url(['patients', patientId]));
    }

    create(patient: IPatient) {
        const data: any = patient;
        data.clinic = patient.clinic.id;
        return this.http.post<IPatient>(this.url(['patients']), JSON.stringify(data));
    }

    update(patient: IPatient) {
        const data: any = patient;
        data.clinic = patient.clinic.id;
        return this.http.put<IPatient>(this.url(['patients', patient.id]), JSON.stringify(data));
    }

    remove(patient: IPatient) {
        return this.http.delete(this.url(['patients', patient.id]));
    }

    save(patient: IPatient): Observable<IPatient> {
        if (patient.id) {
            return this.update(patient);
        } else {
            return this.create(patient);
        }
    }

    count() {
        const filter = new PatientFilter()
        filter.setFilterValue('pageSize', '1');
        return this.http.get(this.url(['patients']), filter.getFilter()).map((data: any) => data.count);
    }

    getSchedules(patientId: number, scheduleFilter?: ScheduleFilter): Observable<IPagedResponse<ISchedule>> {
        const filter = scheduleFilter ? scheduleFilter.getFilter() : new ScheduleFilter().getFilter()
        return this.http.get<IPagedResponse<ISchedule>>(this.url(['patients', patientId, 'schedules']), filter);
    }
}

export interface IPatientService {
    getAll(): Observable<{ results: IPatient[] }>;
    get(patientId: number): Observable<IPatient>;
    create(patient: IPatient);
    update(patient: IPatient);
    remove(patient: IPatient);
    save(patient: IPatient);
    getSchedules(patientId: number, scheduleFilter?: ScheduleFilter): Observable<IPagedResponse<ISchedule>>;
}

export interface IPatient {
    id: number;
    name: string;
    last_name: string;
    sex: string;
    phone: string;
    clinic: IClinic;
}

export class Patient implements IPatient {
    id: number;
    name: string;
    last_name: string;
    sex: string;
    phone: string;
    clinic: IClinic;
}

export class PatientFilter extends BaseFilter {

    constructor() {
        super();
        this.fields.push(
            { name: 'name', mapsTo: 'name', value: null, type: 'filter' },
            { name: 'phone', mapsTo: 'phone', value: null, type: 'filter' },
            { name: 'lastName', mapsTo: 'last_name', value: null, type: 'filter' },
            { name: 'fullName', mapsTo: 'full_name', value: null, type: 'filter' },
        )
        this.setFilterValue('orderBy', 'name')
    }
}
