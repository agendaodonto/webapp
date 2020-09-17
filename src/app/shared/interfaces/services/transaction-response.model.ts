import { ITransactionTypeResponse } from './transaction-type-response.model';

export interface ITransactionResponse {
    id: number;
    amount: number;
    date: string;
    type: ITransactionTypeResponse;
    description: string;
    payment_holder: string;
    service_beneficiary: string;
}
