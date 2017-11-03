import { IClinicService, ClinicFilter, IClinic } from 'app/clinic/clinic.service';
import { Observable } from 'rxjs/Observable';
import { ClinicDatabase } from 'app/shared/testing/databases/clinic.database';

export class ClinicServiceStub implements IClinicService {
    clinicDatabase = new ClinicDatabase();
    getAll(clinicFilter?: ClinicFilter): Observable<{ results: IClinic[]; }> {
        return Observable.of({ results: this.clinicDatabase.getMany(10) });
    }
    get(clinicId: number): Observable<IClinic> {
        return Observable.of(this.clinicDatabase.get());
    }
    create(clinic: IClinic) {
        throw new Error('Method not implemented.');
    }
    update(clinic: IClinic) {
        throw new Error('Method not implemented.');
    }
    remove(clinic: IClinic) {
        throw new Error('Method not implemented.');
    }
    save(clinic: IClinic) {
        throw new Error('Method not implemented.');
    }

}
