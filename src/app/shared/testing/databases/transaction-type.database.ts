import * as faker from 'faker/locale/pt_BR';
import { TransactionTypeDomain } from 'src/app/finance/shared/models/transaction-type.domain';

import { BaseDatabase } from './base.database';

export class TransactionTypeDatabase extends BaseDatabase<TransactionTypeDomain> {
    get(): TransactionTypeDomain {
        return {
            code: Math.floor((Math.random() * 100) + 1),
            label: faker.name.firstName(),
            clinic: Math.floor((Math.random() * 100) + 1),
        };
    }
}
