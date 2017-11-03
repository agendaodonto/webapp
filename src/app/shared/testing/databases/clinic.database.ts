import { IDatabase } from 'app/shared/testing/databases/base.database';
import { IClinic } from 'app/clinic/clinic.service';
import { DentistDatabase } from 'app/shared/testing/databases/dentist.database';
const faker = require('faker/locale/pt_BR');

export class ClinicDatabase implements IDatabase<IClinic> {

    dentistDabase = new DentistDatabase();

    get(): IClinic {
        const clinic: IClinic = {
            id: Math.floor((Math.random() * 100) + 1),
            name: faker.name.firstName(),
            dentists: this.dentistDabase.getMany(Math.floor(Math.random() * 10) + 1)
        }
        return clinic;
    }

    getMany(qty: number): IClinic[] {
        return [];
        // return new Array(qty).fill(null).map(() => this.get());
    }
}
