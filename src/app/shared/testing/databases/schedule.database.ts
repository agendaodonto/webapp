import { IDatabase } from 'app/shared/testing/databases/base.database';
import { IClinic } from 'app/clinic/clinic.service';
import { DentistDatabase } from 'app/shared/testing/databases/dentist.database';
import { IPatient } from 'app/patient/patient.service';
import { ClinicDatabase } from 'app/shared/testing/databases/clinic.database';
import { ISchedule } from 'app/schedule/schedule.service';
import { PatientDatabase } from 'app/shared/testing/databases/patient.database';
const faker = require('faker/locale/pt_BR');

export class ScheduleDatabase implements IDatabase<ISchedule> {

    patientDatabase = new PatientDatabase();
    dentistDatabase = new DentistDatabase();

    get(): ISchedule {
        const schedule: ISchedule = {
            id: Math.floor((Math.random() * 100) + 1),
            patient: this.patientDatabase.get(),
            dentist: this.dentistDatabase.get(),
            duration: Math.floor((Math.random() * 100) + 1),
            status: Math.floor((Math.random() * 3) + 1),
            date: faker.date.recent()
        }
        return schedule;
    }

    getMany(qty: number): ISchedule[] {
        return new Array(qty).fill(null).map(() => this.get());
    }
}
