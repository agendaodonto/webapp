import { TransactionTypeDomain } from './transaction-type.domain';

export interface ITransactionTypeState {
    transactionTypes: {
        all: TransactionTypeDomain[];
        count: number;
        loading: boolean;
        error: boolean;
        empty: boolean;
    };
    transactionTypeDetail: {
        id?: number;
        loading: boolean;
        error: boolean;
        data?: TransactionTypeDomain;
        submitting: boolean;
    };
}
