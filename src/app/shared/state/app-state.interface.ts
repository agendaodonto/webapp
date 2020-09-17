import { ITransactionTypeState } from 'src/app/finance/shared/models/transaction-type.state';

import { IClinicState } from '../../finance/shared/models/clinic.state';
import { ITransactionState } from '../../finance/shared/models/transaction.state';

export interface IAppState {
    finance: {
        clinic: IClinicState,
        transactionTypes: ITransactionTypeState,
        transactions: ITransactionState,
    };
}
