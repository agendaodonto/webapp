import { IDentistService, IDentist } from 'app/shared/services/dentist.service';
import { Observable } from 'rxjs/Observable';
import { DentistDatabase } from 'app/shared/testing/databases/dentist.database';

export class DentistServiceStub implements IDentistService {
    dentistDatabase = new DentistDatabase();

    get(cro: string): Observable<IDentist[]> {
        return Observable.of(this.dentistDatabase.getMany(10))
    }
    create(dentist: IDentist): Observable<IDentist[]> {
        throw new Error('Method not implemented.');
    }
    activate(uid: any, token: any): Observable<any> {
        return Observable.of([]);
    }
    getStates(): Observable<any> {
        return Observable.of([]);
    }

}
