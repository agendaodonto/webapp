import { IClinicService, ClinicFilter, IClinic } from '../../../clinic/clinic.service';
import { ClinicDatabase } from '../databases/clinic.database';
import { IPagedResponse } from '../../interceptors/responses';
import { Observable, of } from 'rxjs';

export class ClinicServiceStub implements IClinicService {
    clinicDatabase = new ClinicDatabase();
    getAll(_clinicFilter?: ClinicFilter): Observable<IPagedResponse<IClinic>> {
        return of({ results: this.clinicDatabase.getMany(10), count: 10 });
    }
    get(_clinicId: number): Observable<IClinic> {
        return of(this.clinicDatabase.get());
    }
    create(_clinic: IClinic) {
        throw new Error('Method not implemented.');
    }
    update(_clinic: IClinic) {
        throw new Error('Method not implemented.');
    }
    remove(_clinic: IClinic) {
        throw new Error('Method not implemented.');
    }
    save(_clinic: IClinic) {
        throw new Error('Method not implemented.');
    }

}
