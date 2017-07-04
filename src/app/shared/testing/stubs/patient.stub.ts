import { IPatient, IPatientService } from 'app/patient/patient.service';

import { ClinicServiceStub } from 'app/shared/testing/stubs/clinic.stub';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PatientServiceStub implements IPatientService {
    static PATIENT: IPatient = {
        id: 1,
        name: 'John',
        last_name: 'Armless',
        sex: 'M',
        phone: '+5519912345678',
        clinic: ClinicServiceStub.CLINIC
    };
    getAll(): Observable<{ results: IPatient[] }> {
        return Observable.of({ results: [PatientServiceStub.PATIENT] });
    }
    get(patientId: number): Observable<IPatient> {
        return Observable.of(PatientServiceStub.PATIENT);
    }
    create(patient: IPatient) {
        throw new Error('Method not implemented.');
    }
    update(patient: IPatient) {
        throw new Error('Method not implemented.');
    }
    remove(patient: IPatient) {
        throw new Error('Method not implemented.');
    }
    save(patient: IPatient) {
        throw new Error('Method not implemented.');
    }

}