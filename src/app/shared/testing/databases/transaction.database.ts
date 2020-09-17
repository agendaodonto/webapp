import * as faker from 'faker/locale/pt_BR';

import { TransactionDomain } from '../../../finance/shared/models/transaction.domain';
import { BaseDatabase } from './base.database';
import { TransactionTypeDatabase } from './transaction-type.database';

export class TransactionDatabase extends BaseDatabase<TransactionDomain> {
    private ttdb = new TransactionTypeDatabase();

    get() {
        return {
            id: Math.floor((Math.random() * 100) + 1),
            description: faker.lorem.words(4),
            type: this.ttdb.get(),
            date: faker.date.future(),
            amount: faker.random.number({ min: 100, precision: 2 }),
            payer: faker.name.firstName(),
            serviceBeneficiary: faker.name.firstName(),
        };
    }
}
