import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from 'src/app/shared/state/app-state.interface';

import { TransactionTypeFilter } from '../../shared/services/transaction-type.filter';
import { TransactionTypeService } from '../../shared/services/transaction-type.service';
import {
    crudTransactionTypeError,
    crudTransactionTypeSuccess,
    deleteTransactionType,
    loadTransactionTypeDetail,
    loadTransactionTypeDetailError,
    loadTransactionTypeDetailSuccess,
    loadTransactionTypes,
    loadTransactionTypesError,
    loadTransactionTypesSuccess,
    saveTransactionType,
    transactionTypesPageChanged,
} from '../actions/transaction-type.actions';

@Injectable()
export class TransactionTypeEffects {

    constructor(
        private readonly action$: Actions,
        private readonly transactionTypeService: TransactionTypeService,
        private readonly router: Router,
        private readonly store: Store<IAppState>,
    ) { }

    loadTransactionTypes$ = createEffect(() => this.action$.pipe(
        ofType(loadTransactionTypes),
        switchMap((v) => {
            return this.transactionTypeService.getAll(v.clinic.id).pipe(
                map(transactionTypes => loadTransactionTypesSuccess({ transactionTypes })),
                catchError(() => of(loadTransactionTypesError()),
                ));
        }),
    ));

    transactionTypeListPageChange$ = createEffect(() => this.action$.pipe(
        ofType(transactionTypesPageChanged),
        withLatestFrom(this.store.select(s => s.finance.clinic.selected)),
        switchMap(([data, clinic]) => {

            if (!clinic) {
                return of(loadTransactionTypesError());
            }

            const offset = data.event.pageSize * data.event.pageIndex;
            const filter = new TransactionTypeFilter();
            filter.setFilterValue('pageSize', data.event.pageSize.toString());
            filter.setFilterValue('offset', offset.toString());
            return this.transactionTypeService.getAll(clinic.id, filter).pipe(
                map(transactionTypes => loadTransactionTypesSuccess({ transactionTypes })),
            );
        }),
    ));

    viewTransactionTypeDetail$ = createEffect(() => this.action$.pipe(
        ofType(loadTransactionTypeDetail),
        withLatestFrom(this.store.select(s => s.finance.clinic.selected)),
        switchMap(([data, clinic]) => {
            this.router.navigate(['tipo-transacao/detalhe']);
            if (!clinic) {
                return of(loadTransactionTypesError());
            }
            return this.transactionTypeService.get(clinic.id, data.transactionTypeId).pipe(
                map(transactionType => loadTransactionTypeDetailSuccess({ transactionType })),
                catchError(() => of(loadTransactionTypeDetailError())),
            );
        }),
    ));

    saveTransactionType$ = createEffect(() => this.action$.pipe(
        ofType(saveTransactionType),
        withLatestFrom(this.store.select(s => s.finance.clinic.selected)),
        switchMap(([data, clinic]) => {

            if (!clinic) {
                return of(crudTransactionTypeError());
            }

            return this.transactionTypeService.save(clinic.id, data.transactionType).pipe(
                tap(() => this.router.navigate(['/tipo-transacao'])),
                map(() => crudTransactionTypeSuccess()),
                catchError(() => of(crudTransactionTypeError())),
            );
        }),
    ));

    deleteTransactionType$ = createEffect(() => this.action$.pipe(
        ofType(deleteTransactionType),
        withLatestFrom(this.store.select(s => s.finance.clinic.selected)),
        switchMap(([data, clinic]) => {
            if (!clinic || !data.transactionType.id) {
                return of(crudTransactionTypeError());
            }

            return this.transactionTypeService.delete(clinic.id, data.transactionType.id).pipe(
                tap(() => this.router.navigate(['/tipo-transacao'])),
                map(() => crudTransactionTypeSuccess()),
                catchError(() => of(crudTransactionTypeError())),
            );
        }),
    ));
}
