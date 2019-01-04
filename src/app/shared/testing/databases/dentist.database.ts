import * as faker from 'faker/locale/pt_BR';

import { IDentist } from '../../services/dentist.service';
import { IDatabase } from './base.database';

export class DentistDatabase implements IDatabase<IDentist> {

    get(): IDentist {
        const cro = Math.floor((Math.random() * 10000) + 1 );
        const dentist: IDentist = {
            id: Math.floor((Math.random() * 100) + 1),
            cro: cro.toString(),
            cro_state: 'SP',
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            sex: 'M',
        };
        return dentist;
    }

    getMany(qty: number): IDentist[] {
        return new Array(qty).fill(null).map(() => this.get());
    }
}
