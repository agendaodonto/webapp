import { ITransactionTypeResponse } from 'src/app/shared/interfaces/services/transaction-type-response.model';

export class TransactionTypeDomain {
    clinic: number;
    code: number;
    label: string;

    static fromResponse(response: ITransactionTypeResponse): TransactionTypeDomain {
        const domain = new TransactionTypeDomain();
        domain.code = response.code;
        domain.label = response.label;
        domain.clinic = response.clinic;
        return domain;
    }
}
