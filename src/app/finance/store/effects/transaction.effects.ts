import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from 'src/app/shared/state/app-state.interface';

import { IPagedResponse } from '../../../shared/interceptors/responses';
import { hasValue } from '../../../shared/operators/has-value.operator';
import { IEditableTransactionState } from '../../shared/models/editable-transaction.state';
import { TransactionFilter } from '../../shared/services/transaction.filter';
import { TransactionService } from '../../shared/services/transaction.service';
import { loadTransactions, loadTransactionsError, loadTransactionsSuccess } from '../actions/transaction.action';

@Injectable()
export class TransactionEffects {

    constructor(
        private readonly action$: Actions,
        private readonly transactionService: TransactionService,
        private readonly store: Store<IAppState>,
    ) { }

    loadTransaction$ = createEffect(() => this.action$.pipe(
        ofType(loadTransactions),
        withLatestFrom(this.store.select(s => s.finance.clinic.selected).pipe(hasValue())),
        switchMap(([data, clinic]) => {
            const filter = new TransactionFilter();
            filter.setFilterValue('pageSize', data.pageSize.toString());
            filter.setFilterValue('offset', data.page.toString());
            return this.transactionService.getAll(clinic.id, filter).pipe(
                map(transactions => {
                    const transformed: IPagedResponse<IEditableTransactionState> = {
                        count: transactions.count,
                        results: transactions.results.map(t => ({ transaction: t, editing: false, submitting: false })),
                    };
                    return transformed;
                }),
                map(transactions => loadTransactionsSuccess({ transactions })),
                catchError(() => of(loadTransactionsError()),
                ));
        }),
    ));

}
