import { IDentist, IDentistService } from 'app/shared/services/dentist.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DentistServiceStub implements IDentistService {
    static DENTISTS: IDentist[] = [
        { id: 1, cro: '1234', cro_state: 'SP', first_name: 'John', last_name: 'Snow', email: 'john@snow.com', sex: 'M' },
        { id: 2, cro: '5678', cro_state: 'SP', first_name: 'Know', last_name: 'Nothing', email: 'nothing@snow.com', sex: 'M' },
        { id: 3, cro: '9999', cro_state: 'MG', first_name: 'Arya', last_name: 'Stark', email: 'arya@stark.com', sex: 'F' }
    ];
    static STATES = [
        {value: 'SP', display_name: 'São Paulo'},
        {value: 'RJ', display_name: 'Rio de Janeiro'},
        {value: 'MG', display_name: 'Minas Gerais'},
    ]
    create(dentist: IDentist): Observable<IDentist[]> {
        throw new Error('Method not implemented.');
    }
    activate(uid: any, token: any): Observable<any> {
        return Observable.of([]);
    }
    getStates(): Observable<any> {
        return Observable.of(DentistServiceStub.STATES);
    }
    get(cro: string): Observable<IDentist[]> {
        return Observable.of(DentistServiceStub.DENTISTS);
    }
}
