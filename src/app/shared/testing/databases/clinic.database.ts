import * as faker from 'faker/locale/pt_BR';

import { IClinic } from '../../../clinic/clinic.service';
import { IDatabase } from './base.database';
import { DentistDatabase } from './dentist.database';

export class ClinicDatabase implements IDatabase<IClinic> {

    dentistDabase = new DentistDatabase();

    get(): IClinic {
        const clinic: IClinic = {
            id: Math.floor((Math.random() * 100) + 1),
            name: faker.name.firstName(),
            dentists: this.dentistDabase.getMany(Math.floor(Math.random() * 10) + 1),
        };
        return clinic;
    }

    getMany(qty: number): IClinic[] {
        return new Array(qty).fill(null).map(() => this.get());
    }
}
