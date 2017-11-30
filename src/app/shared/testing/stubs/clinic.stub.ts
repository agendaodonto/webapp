import { IClinicService, ClinicFilter, IClinic } from 'app/clinic/clinic.service';
import { Observable } from 'rxjs/Observable';
import { ClinicDatabase } from 'app/shared/testing/databases/clinic.database';

export class ClinicServiceStub implements IClinicService {
    clinicDatabase = new ClinicDatabase();
    getAll(_clinicFilter?: ClinicFilter): Observable<{ results: IClinic[]; }> {
        return Observable.of({ results: this.clinicDatabase.getMany(10) });
    }
    get(_clinicId: number): Observable<IClinic> {
        return Observable.of(this.clinicDatabase.get());
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
