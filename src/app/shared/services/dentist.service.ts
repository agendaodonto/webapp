import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IDentistService {
    get(cro: string): Observable<IDentist[]>;
    create(dentist: IDentist): Observable<IDentist[]>;
    activate(uid, token): Observable<any>;
    getStates(): Observable<any>;
}


@Injectable()
export class DentistService extends BaseService implements IDentistService {
    constructor(private http: HttpClient) {
        super();
    }

    get(cro: string): Observable<IDentist[]> {
        return this.http.get(this.url(['dentists']) + '?cro=' + cro)
            .pipe(map((data: any) => data.results));
    }

    create(dentist: IDentist): Observable<IDentist[]> {
        return this.http.post<IDentist[]>(BaseService.API_AUTH_URL + 'register/', JSON.stringify(dentist));
    }

    activate(uid, token): Observable<any> {
        const body = { uid: uid, token: token };
        return this.http.post(BaseService.API_AUTH_URL + 'activate/', JSON.stringify(body));
    }

    getStates(): Observable<any> {
        return this.http.options(BaseService.API_AUTH_URL + 'register/').pipe(
            map((data: any) => data.actions.POST.cro_state.choices)
        );
    }

    me(): Observable<IDentist> {
        return this.http.get<IDentist>(this.url(['dentists', 'me']));
    }

    update(dentist: IDentist): Observable<IDentist> {
        return this.http.put<IDentist>(this.url(['dentists', 'me']), JSON.stringify(dentist));
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
