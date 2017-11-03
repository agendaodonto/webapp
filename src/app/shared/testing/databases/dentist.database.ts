import { IDatabase } from 'app/shared/testing/databases/base.database';
import { IDentist } from 'app/shared/services/dentist.service';
const faker = require('faker/locale/pt_BR');

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
            sex: 'M'
        }
        return dentist;
    }

    getMany(qty: number): IDentist[] {
        return new Array(qty).fill(null).map(() => this.get());
    }
}
