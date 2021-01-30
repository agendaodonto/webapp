import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagedResponse } from 'src/app/shared/interceptors/responses';
import { BaseService } from 'src/app/shared/services/base.service';

import { ITransactionResponse } from '../../../shared/interfaces/services/transaction-response.model';
import { TransactionDomain } from '../models/transaction.domain';
import { TransactionFilter } from './transaction.filter';

@Injectable()
export class TransactionService extends BaseService {

    constructor(private readonly http: HttpClient) {
        super();
    }

    getAll(clinicId: number, filter?: TransactionFilter): Observable<IPagedResponse<TransactionDomain>> {
        const url = this.url(['finance/transactions', clinicId]);
        const params = filter ? filter.getFilter() : new TransactionFilter().getFilter();

        return this.http.get<IPagedResponse<ITransactionResponse>>(url, params).pipe(
            map(response => {
                return {
                    results: response.results.map(TransactionDomain.fromResponse),
                    count: response.count,
                };
            }),
        );
    }

    // get(clinicId: number, transactionId: number): Observable<TransactionTypeDomain> {
    //     const url = this.url(['finance/transaction-types', clinicId, transactionId]);

    //     return this.http.get<ITransactionTypeResponse>(url).pipe(map(TransactionTypeDomain.fromResponse));
    // }

    // delete(clinicId: number, transactionId: number): Observable<void> {
    //     const url = this.url(['finance/transaction-types', clinicId, transactionId]);

    //     return this.http.delete<void>(url);
    // }

    // create(clinicId: number, transactionType: TransactionTypeDomain): Observable<void> {
    //     const url = this.url(['finance/transaction-types', clinicId]);

    //     return this.http.post<void>(url, transactionType);
    // }

    // update(clinicId: number, transactionType: TransactionTypeDomain): Observable<void> {
    //     const url = this.url(['finance/transaction-types', clinicId, transactionType.id]);

    //     return this.http.put<void>(url, transactionType);
    // }

    // save(clinicId: number, transactionType: TransactionTypeDomain): Observable<void> {
    //     if (transactionType.id) {
    //         return this.update(clinicId, transactionType);
    //     } else {
    //         return this.create(clinicId, transactionType);
    //     }
    // }

}
