import { AuthHttp } from '../auth_http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export interface IDentistService {
    get(cro: string): Observable<IDentist[]>;
    create(dentist: IDentist): Observable<IDentist[]>;
    activate(uid, token): Observable<any>;
    getStates(): Observable<any>;
}


@Injectable()
export class DentistService extends BaseService implements IDentistService {
    constructor(private http: AuthHttp) {
        super();
    }

    get(cro: string): Observable<IDentist[]> {
        return this.http.get(this.url(['dentists']) + '?cro=' + cro)
            .map(data => data.json().results);
    }

    create(dentist: IDentist): Observable<IDentist[]> {
        return this.http.post(BaseService.API_AUTH_URL + 'register/', JSON.stringify(dentist)).map(data => data.json());
    }

    activate(uid, token): Observable<any> {
        const body = { uid: uid, token: token };
        return this.http.post(BaseService.API_AUTH_URL + 'activate/', JSON.stringify(body)).map(data => data.json());
    }

    getStates(): Observable<any> {
        return this.http.options(BaseService.API_AUTH_URL + 'register/').map(data => data.json().actions.POST.cro_state.choices)
    }
}

export interface IDentist {
    id: number;
    cro: string;
    cro_state: string;
    first_name: string;
    last_name: string;
    email: string;
    sex: string;
}
