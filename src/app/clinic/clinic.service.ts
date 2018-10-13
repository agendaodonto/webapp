import { BaseFilter, BaseService } from '../shared/services/base.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPagedResponse } from '../shared/interceptors/responses';
import { IDentist } from '../shared/services/dentist.service';

export interface IClinicService {
    getAll(clinicFilter?: ClinicFilter): Observable<{ results: IClinic[] }>;
    get(clinicId: number): Observable<IClinic>;
    create(clinic: IClinic);
    update(clinic: IClinic);
    remove(clinic: IClinic);
    save(clinic: IClinic);
}

@Injectable()
export class ClinicService extends BaseService implements IClinicService {

    constructor(private http: HttpClient) {
        super();
    }

    getAll(clinicFilter?: ClinicFilter): Observable<IPagedResponse<IClinic>> {
        const filter = clinicFilter ? clinicFilter : new ClinicFilter();
        return this.http.get<IPagedResponse<IClinic>>(this.url(['clinics']), filter.getFilter());
    }

    get(clinicId: number): Observable<IClinic> {
        return this.http.get<IClinic>(this.url(['clinics', clinicId]));
    }

    create(clinic: IClinic) {
        const data: any = clinic;
        data.dentists = data.dentists.map(dentist => dentist.id);
        return this.http.post<IClinic>(this.url(['clinics']), JSON.stringify(data));
    }

    update(clinic: IClinic) {
        const data: any = clinic;
        data.dentists = data.dentists.map(dentist => dentist.id);
        return this.http.put<IClinic>(this.url(['clinics', clinic.id]), JSON.stringify(data));
    }

    remove(clinic: IClinic) {
        return this.http.delete(this.url(['clinics', clinic.id]));
    }

    save(clinic: IClinic) {
        if (clinic.id) {
            return this.update(clinic);
        } else {
            return this.create(clinic);
        }
    }
}

export interface IClinic {
    id: number;
    name: string;
    dentists: IDentist[];
}

export class ClinicFilter extends BaseFilter {

}
