import { ITransactionTypeState } from 'src/app/finance/shared/models/transaction-type.state';

import { IClinicState } from '../../finance/shared/models/clinic.state';

export interface IAppState {
    finance: {
        clinic: IClinicState,
        transactionTypes: ITransactionTypeState,
    };
}
