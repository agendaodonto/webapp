import { TransactionDomain } from './transaction.domain';

export interface IEditableTransactionState {
    transaction: TransactionDomain;
    editing: boolean;
    submitting: boolean;
}
