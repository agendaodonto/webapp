import * as faker from 'faker/locale/pt_BR';
import { IPatient } from '../../../patient/patient.service';
import { IDatabase } from './base.database';
import { ClinicDatabase } from './clinic.database';

export class PatientDatabase implements IDatabase<IPatient> {

    clinicDatabase = new ClinicDatabase();

    get(): IPatient {
        const patient: IPatient = {
            id: Math.floor((Math.random() * 100) + 1),
            name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            sex: 'M',
            phone: faker.phone.phoneNumber(),
            clinic: this.clinicDatabase.get(),
        };
        return patient;
    }

    getMany(qty: number): IPatient[] {
        return new Array(qty).fill(null).map(() => this.get());
    }
}
