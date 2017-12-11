import 'rxjs/add/operator/map';

import { BaseFilter, BaseService } from '../shared/services/base.service';

import { AuthHttp } from '../shared/auth_http';
import { IDentist } from 'app/shared/services/dentist.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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

    constructor(private http: AuthHttp) {
        super();
    }

    getAll(clinicFilter?: ClinicFilter): Observable<{ count: number, results: IClinic[] }> {
        const filter = clinicFilter ? clinicFilter : new ClinicFilter();
        return this.http.get(this.url(['clinics']), filter.getFilter()).map(response => response.json());
    }

    get(clinicId: number): Observable<IClinic> {
        return this.http.get(this.url(['clinics', clinicId])).map(response => response.json());
    }

    create(clinic: IClinic) {
        const data: any = clinic;
        data.dentists = data.dentists.map(dentist => dentist.id);
        return this.http.post(this.url(['clinics']), JSON.stringify(data)).map(response => response.json());
    }

    update(clinic: IClinic) {
        const data: any = clinic;
        data.dentists = data.dentists.map(dentist => dentist.id);
        return this.http.put(this.url(['clinics', clinic.id]), JSON.stringify(data)).map(response => response.json());
    }

    remove(clinic: IClinic) {
        return this.http.remove(this.url(['clinics', clinic.id])).map(response => response.json());
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
