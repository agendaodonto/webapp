import 'rxjs/add/operator/map';

import { BaseFilter, BaseService } from '../shared/services/base.service';
import { RequestOptions, URLSearchParams } from '@angular/http';

import { AuthHttp } from '../shared/auth_http';
import { IClinic } from '../clinic/clinic.service';
import { ISchedule } from '../schedule/schedule.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ScheduleFilter } from 'app/schedule/schedule.service';

@Injectable()
export class PatientService extends BaseService implements IPatientService {

    constructor(private http: AuthHttp) {
        super();
    }

    getAll(patientFilter?: PatientFilter): Observable<{ count: number, results: IPatient[] }> {
        const filter = patientFilter ? patientFilter.getFilter() : new PatientFilter().getFilter();
        return this.http.get(this.url(['patients']), filter).map(data => data.json());
    }

    get(patientId: number): Observable<IPatient> {
        return this.http.get(this.url(['patients', patientId])).map(response => response.json());
    }

    create(patient: IPatient) {
        const data: any = patient;
        data.clinic = patient.clinic.id;
        return this.http.post(this.url(['patients']), JSON.stringify(data)).map(response => response.json());
    }

    update(patient: IPatient) {
        const data: any = patient;
        data.clinic = patient.clinic.id;
        return this.http.put(this.url(['patients', patient.id]), JSON.stringify(data)).map(response => response.json());
    }

    remove(patient: IPatient) {
        return this.http.remove(this.url(['patients', patient.id])).map(response => response.json());
    }

    save(patient: IPatient): Observable<IPatient> {
        if (patient.id) {
            return this.update(patient);
        } else {
            return this.create(patient);
        }
    }

    count() {
        const params = new URLSearchParams();
        params.set('limit', '1');
        const options = new RequestOptions();
        options.params = params;
        return this.http.get(this.url(['patients']), options).map(data => data.json().count);
    }

    getSchedules(patientId: number, scheduleFilter?: ScheduleFilter): Observable<{ count: number, results: ISchedule[] }> {
        const filter = scheduleFilter ? scheduleFilter.getFilter() : new ScheduleFilter().getFilter()
        return this.http.get(this.url(['patients', patientId, 'schedules']), filter).map(data => data.json());
    }
}

export interface IPatientService {
    getAll(): Observable<{ results: IPatient[] }>;
    get(patientId: number): Observable<IPatient>;
    create(patient: IPatient);
    update(patient: IPatient);
    remove(patient: IPatient);
    save(patient: IPatient);
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
        )
        this.setFilterValue('orderBy', 'name')
    }
}
