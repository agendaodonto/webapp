import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagedResponse } from 'src/app/shared/interceptors/responses';
import { ITransactionTypeResponse } from 'src/app/shared/interfaces/services/transaction-type-response.model';
import { BaseService } from 'src/app/shared/services/base.service';

import { TransactionTypeDomain } from '../models/transaction-type.domain';
import { TransactionTypeFilter } from './transaction-type.filter';

@Injectable()
export class TransactionTypeService extends BaseService {

    constructor(private readonly http: HttpClient) {
        super();
    }

    getAll(clinicId: number, filter?: TransactionTypeFilter): Observable<IPagedResponse<TransactionTypeDomain>> {
        const url = this.url(['finance/transaction-types', clinicId]);
        const params = filter ? filter.getFilter() : new TransactionTypeFilter().getFilter();

        return this.http.get<IPagedResponse<ITransactionTypeResponse>>(url, params).pipe(
            map(response => {
                return {
                    results: response.results.map(TransactionTypeDomain.fromResponse),
                    count: response.count,
                };
            }),
        );
    }

    create(transaction: TransactionTypeDomain): Observable<TransactionTypeDomain> {
        const url = this.url(['finance/transaction-types', transaction.clinic]);

        return this.http.post<ITransactionTypeResponse>(url, transaction).pipe(
            map(response => TransactionTypeDomain.fromResponse(response)),
        );
    }
}
