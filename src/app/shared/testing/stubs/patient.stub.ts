import { IPatientService, IPatient } from 'app/patient/patient.service';
import { Observable } from 'rxjs/Observable';
import { ScheduleFilter, ISchedule } from 'app/schedule/schedule.service';
import { IPagedResponse } from 'app/shared/auth_http';
import { PatientDatabase } from 'app/shared/testing/databases/patient.database';
import { ScheduleDatabase } from 'app/shared/testing/databases/schedule.database';

export class PatientServiceStub implements IPatientService {
    patientDatabase = new PatientDatabase();
    scheduleDatabase = new ScheduleDatabase();
    getAll(): Observable<{ results: IPatient[]; }> {
        return Observable.of({ results: this.patientDatabase.getMany(50) })
    }
    get(_patientId: number): Observable<IPatient> {
        return Observable.of(this.patientDatabase.get())
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
        return Observable.of({ count: 10, results: this.scheduleDatabase.getMany(10) });
    }

}
