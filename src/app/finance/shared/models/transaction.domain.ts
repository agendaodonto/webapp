import { parse } from 'date-fns';
import { ITransactionResponse } from '../../../shared/interfaces/services/transaction-response.model';
import { TransactionTypeDomain } from './transaction-type.domain';

export class TransactionDomain {
    id?: number;
    description: string;
    type: TransactionTypeDomain;
    date: Date;
    amount: number;
    payer: string;
    serviceBeneficiary: string;

    static fromResponse(response: ITransactionResponse): TransactionDomain {
        const domain = new TransactionDomain();
        domain.id = response.id;
        domain.description = response.description;
        domain.type = TransactionTypeDomain.fromResponse(response.type);
        domain.date = parse(response.date);
        domain.amount = response.amount;
        domain.payer = response.payment_holder;
        domain.serviceBeneficiary = response.service_beneficiary;
        return domain;
    }

}
