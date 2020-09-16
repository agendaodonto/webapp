import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { hasValue } from '../../shared/operators/has-value.operator';

import { IAppState } from '../../shared/state/app-state.interface';
import { clinicSelected, loadClinics } from '../store/actions/clinic.action';
import { loadTransactionTypes } from '../store/actions/transaction-type.actions';

@Component({
    selector: 'app-transaction-type',
    templateUrl: './transaction-type.component.html',
    styleUrls: ['./transaction-type.component.scss'],
})
export class TransactionTypeComponent implements OnInit {
    state$ = this.store.select(m => m.finance.transactionTypes);
    clinicState$ = this.store.select(m => m.finance.clinic);
    clinic$ = this.clinicState$.pipe(
        filter(s => !s.error && !s.empty),
        map(v => v.all),
        distinctUntilChanged(),
    );
    selectedClinic$ = this.clinicState$.pipe(map(s => s.selected));
    empty$ = this.clinicState$.pipe(map(v => v.empty));
    error$ = this.clinicState$.pipe(map(v => v.error));
    loading$ = this.clinicState$.pipe(map(v => v.loading));
    hasClinics$ = this.clinicState$.pipe(map(v => !v.empty && !v.error && !v.loading));

    constructor(private readonly store: Store<IAppState>) {
    }

    ngOnInit() {
        this.clinic$
            .pipe(filter(response => response.length > 0))
            .subscribe(clinics => {
                this.store.dispatch(clinicSelected({ clinic: clinics[0] }));
            });

        this.selectedClinic$
            .pipe(hasValue())
            .subscribe(clinic => {
                this.store.dispatch(loadTransactionTypes({ clinic }));
            });

        this.store.dispatch(loadClinics());
    }

    clinicSelected(change: MatSelectChange) {
        this.store.dispatch(clinicSelected({ clinic: change.value }));
    }

}
