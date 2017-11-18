import { IDatabase } from 'app/shared/testing/databases/base.database';
import { IClinic } from 'app/clinic/clinic.service';
import { DentistDatabase } from 'app/shared/testing/databases/dentist.database';
import { IPatient } from 'app/patient/patient.service';
import { ClinicDatabase } from 'app/shared/testing/databases/clinic.database';
const faker = require('faker/locale/pt_BR');

export class PatientDatabase implements IDatabase<IPatient> {

    clinicDatabase = new ClinicDatabase();

    get(): IPatient {
        const patient: IPatient = {
            id: Math.floor((Math.random() * 100) + 1),
            name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            sex: 'M',
            phone: faker.phone.phoneNumber(),
            clinic: this.clinicDatabase.get()
        }
        return patient;
    }

    getMany(qty: number): IPatient[] {
        return new Array(qty).fill(null).map(() => this.get());
    }
}
