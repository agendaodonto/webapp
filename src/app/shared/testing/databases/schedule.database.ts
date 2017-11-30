import { DentistDatabase } from './dentist.database';
import { PatientDatabase } from './patient.database';
import { ISchedule } from '../../../schedule/schedule.service';
import { IDatabase } from './base.database';
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
