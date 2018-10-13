import { PatientDatabase } from '../databases/patient.database';
import { IPatientService, IPatient } from '../../../patient/patient.service';
import { ScheduleDatabase } from '../databases/schedule.database';
import { Observable, of } from 'rxjs';
import { ScheduleFilter, ISchedule } from '../../../schedule/schedule.service';
import { IPagedResponse } from '../../interceptors/responses';

export class PatientServiceStub implements IPatientService {
    patientDatabase = new PatientDatabase();
    scheduleDatabase = new ScheduleDatabase();
    getAll(): Observable<{ results: IPatient[]; }> {
        return of({ results: this.patientDatabase.getMany(50) });
    }
    get(_patientId: number): Observable<IPatient> {
        return of(this.patientDatabase.get());
    }
    create(_patient: IPatient) {
        throw new Error('Method not implemented.');
    }
    update(_patient: IPatient) {
        throw new Error('Method not implemented.');
    }
    remove(_patient: IPatient) {
        throw new Error('Method not implemented.');
    }
    save(_patient: IPatient) {
        throw new Error('Method not implemented.');
    }
    getSchedules(_patientId: number, _scheduleFilter?: ScheduleFilter): Observable<IPagedResponse<ISchedule>> {
        return of({ count: 10, results: this.scheduleDatabase.getMany(10) });
    }

}
