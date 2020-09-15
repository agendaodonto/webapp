import { ITransactionTypeResponse } from 'src/app/shared/interfaces/services/transaction-type-response.model';

export class TransactionTypeDomain {
    id: number;
    code: number;
    label: string;

    static fromResponse(response: ITransactionTypeResponse): TransactionTypeDomain {
        const domain = new TransactionTypeDomain();
        domain.id = response.id;
        domain.code = response.code;
        domain.label = response.label;
        return domain;
    }
}
