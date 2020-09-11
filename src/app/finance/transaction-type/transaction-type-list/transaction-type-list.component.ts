import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { ITransactionTypeState } from '../../shared/models/transaction-type.state';
import { transactionTypesPageChanged } from '../../store/actions/transaction-type.actions';

@Component({
    selector: 'app-transaction-type-list',
    templateUrl: './transaction-type-list.component.html',
})
export class TransactionTypeListComponent implements AfterViewInit {
    state$ = this.store.select(m => m.finance.transactionTypes);
    empty$ = this.state$.pipe(map(v => v.transactionTypes.empty));
    error$ = this.state$.pipe(map(v => v.transactionTypes.error));
    loading$ = this.state$.pipe(map(v => v.transactionTypes.loading));
    hasResult$ = this.state$.pipe(map(v => !v.transactionTypes.empty && !v.transactionTypes.error && !v.transactionTypes.loading));
    count$ = this.state$.pipe(map(v => v.transactionTypes.count));

    rows$ = this.state$.pipe(map(v => v.transactionTypes.all));

    displayedColumns = ['code', 'label'];

    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator;

    constructor(private readonly store: Store<{ finance: { transactionTypes: ITransactionTypeState } }>) { }

    ngAfterViewInit() {
        this.paginator.page.subscribe((pageEvent: PageEvent) => {
            this.store.dispatch(transactionTypesPageChanged({ event: pageEvent }));
        });
    }
}
