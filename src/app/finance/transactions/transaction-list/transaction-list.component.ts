import { Component, OnInit } from '@angular/core';
import { MatSelectChange, PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { hasValue } from '../../../shared/operators/has-value.operator';
import { IAppState } from '../../../shared/state/app-state.interface';
import { clinicSelected, loadClinics } from '../../store/actions/clinic.action';
import { loadTransactions } from '../../store/actions/transaction.action';

@Component({
    selector: 'app-transaction-list',
    templateUrl: 'transaction-list.component.html',
})
export class TransactionListComponent implements OnInit {
    transactionState$ = this.store.select(m => m.finance.transactions);
    clinicState$ = this.store.select(m => m.finance.clinic);

    selectedClinic$ = this.clinicState$.pipe(map(c => c.selected), hasValue());
    clinic$ = this.clinicState$.pipe(
        filter(s => !s.error && !s.empty),
        map(v => v.all),
        distinctUntilChanged(),
    );
    empty$ = this.transactionState$.pipe(map(v => v.empty));
    error$ = this.transactionState$.pipe(map(v => v.error));
    loading$ = this.clinicState$.pipe(map(v => v.loading));
    hasClinics$ = this.clinicState$.pipe(map(v => !v.empty && !v.error && !v.loading));
    hasResult$ = this.transactionState$.pipe(map(v => !v.empty && !v.error && !v.loading));
    transactions$ = this.transactionState$;
    rows$ = this.transactionState$.pipe(map(t => t.all.results));
    count$ = this.transactionState$.pipe(map(t => t.all.count));
    displayedColumns = ['date', 'type', 'payer', 'serviceBeneficiary', 'description', 'value'];

    constructor(private readonly store: Store<IAppState>) { }

    ngOnInit() {
        this.clinic$.subscribe(clinics => {
            this.store.dispatch(clinicSelected({ clinic: clinics[0] }));
        });

        this.store.dispatch(loadClinics());

        this.selectedClinic$.subscribe(() => {
            this.store.dispatch(loadTransactions({ page: 0, pageSize: 10 }));
        });

    }

    clinicSelected(change: MatSelectChange) {
        this.store.dispatch(clinicSelected({ clinic: change.value }));
    }

    paginate(pageEvent: PageEvent) {
        this.store.dispatch(loadTransactions({ page: pageEvent.pageIndex * pageEvent.pageSize, pageSize: pageEvent.pageSize }));
    }

    createTransaction() {

    }
}
