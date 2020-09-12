import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ClinicService } from 'src/app/clinic/clinic.service';
import { ITransactionTypeState } from '../../shared/models/transaction-type.state';
import { TransactionTypeFilter } from '../../shared/services/transaction-type.filter';

import { TransactionTypeService } from '../../shared/services/transaction-type.service';
import {
    clinicSelected,
    loadClinics,
    loadClinicsError,
    loadClinicsSuccess,
    loadTransactionTypesError,
    loadTransactionTypesSuccess,
    transactionTypesPageChanged,
} from '../actions/transaction-type.actions';

@Injectable()
export class TransactionTypeEffects {

    constructor(
        private readonly action$: Actions,
        private readonly clinicService: ClinicService,
        private readonly transactionTypeService: TransactionTypeService,
    ) { }

    refreshClinic$ = createEffect(() => this.action$.pipe(
        ofType(loadClinics),
        switchMap(() => {
            return this.clinicService.getAll().pipe(
                map(clinics => loadClinicsSuccess({ clinics: clinics.results })),
                catchError(() => of(loadClinicsError()),
                ));
        }),
    ));

    refreshTransactionType$ = createEffect(() => this.action$.pipe(
        ofType(clinicSelected),
        switchMap((v) => {
            return this.transactionTypeService.getAll(v.clinic.id).pipe(
                map(transactionTypes => loadTransactionTypesSuccess({ transactionTypes })),
                catchError(() => of(loadTransactionTypesError()),
                ));
        }),
    ));

    transactionTypeListPageChange$ = createEffect(() => this.action$.pipe(
        ofType(transactionTypesPageChanged),
        switchMap((data, clinic) => {
            const offset = data.event.pageSize * data.event.pageIndex;
            const filter = new TransactionTypeFilter();
            filter.setFilterValue('pageSize', data.event.pageSize.toString());
            filter.setFilterValue('offset', offset.toString());
            return this.transactionTypeService.getAll(clinic, filter).pipe(
                map(transactionTypes => loadTransactionTypesSuccess({ transactionTypes })),
            );
        }),
    ));
}
