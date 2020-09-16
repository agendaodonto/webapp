import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { IAppState } from 'src/app/shared/state/app-state.interface';
import { CustomFB, CustomFG } from 'src/app/shared/validation';

import { hasValue } from '../../../shared/operators/has-value.operator';
import { TransactionTypeDomain } from '../../shared/models/transaction-type.domain';
import { deleteTransactionType, saveTransactionType } from '../../store/actions/transaction-type.action';

@Component({
    selector: 'app-transaction-type-detail',
    templateUrl: './transaction-type-detail.component.html',
})
export class TransactionTypeDetailComponent implements OnInit {

    transactionTypeForm: CustomFG;

    state$ = this.store.select(m => m.finance.transactionTypes);

    loading$ = this.state$.pipe(map(v => v.transactionTypeDetail.loading));
    error$ = this.state$.pipe(map(v => v.transactionTypeDetail.error));

    submitting$ = this.state$.pipe(map(v => v.transactionTypeDetail.submitting));

    constructor(
        private readonly store: Store<IAppState>,
    ) {
        this.transactionTypeForm = new CustomFB().group({
            id: [''],
            label: ['', Validators.required],
            code: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.state$.pipe(
            map(v => v.transactionTypeDetail.data),
            hasValue(),
            distinctUntilChanged(),
        ).subscribe(data => {
            this.transactionTypeForm.setValue({ ...data });
        });
    }

    onSubmit() {
        this.store.dispatch(saveTransactionType({transactionType: TransactionTypeDomain.fromObject(this.transactionTypeForm.value)}));
    }

    onDelete() {
        this.store.dispatch(deleteTransactionType({ transactionType: TransactionTypeDomain.fromObject(this.transactionTypeForm.value)}));
    }
}
