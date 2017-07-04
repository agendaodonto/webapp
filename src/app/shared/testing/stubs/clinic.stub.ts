import { IClinic, IClinicService } from '../../../clinic/clinic.service';

import { DentistServiceStub } from './dentist.stub';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClinicServiceStub implements IClinicService {
    static CLINIC: IClinic = {id: 1, name: 'Test Clinic', owner: 1, dentists: [DentistServiceStub.DENTISTS[0]]};

    getAll(): Observable<{ results: IClinic[]; }> {
        return Observable.from([
            {results: [ClinicServiceStub.CLINIC]},
        ]);
    }

    get(clinicId: number): Observable<IClinic> {
        return Observable.from([ClinicServiceStub.CLINIC]);
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
