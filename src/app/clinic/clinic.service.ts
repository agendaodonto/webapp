import { BaseFilter, BaseService } from '../shared/services/base.service';

import { IDentist } from 'app/shared/services/dentist.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IPagedResponse } from 'app/shared/interceptors/responses';

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

export class Clinic implements IClinic {
    id: number;
    name: string;
    owner: number;
    dentists: Array<any> = [];
}

export class ClinicModel implements Clinic {
    constructor(public id, public name, public owner, public dentists) {
    }
}

export class ClinicFilter extends BaseFilter {

}
