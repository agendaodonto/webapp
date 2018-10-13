import { of, Observable } from 'rxjs';
import { IDentist, IDentistService } from '../../services/dentist.service';
import { DentistDatabase } from '../databases/dentist.database';

export class DentistServiceStub implements IDentistService {
    dentistDatabase = new DentistDatabase();

    get(_cro: string): Observable<IDentist[]> {
        return of(this.dentistDatabase.getMany(10));
    }
    create(_dentist: IDentist): Observable<IDentist[]> {
        throw new Error('Method not implemented.');
    }
    activate(_uid: any, _token: any): Observable<any> {
        return of([]);
    }
    getStates(): Observable<any> {
        return of([]);
    }

}
