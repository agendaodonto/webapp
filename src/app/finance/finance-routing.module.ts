import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionTypeDetailComponent } from './transaction-type/transaction-type-detail/transaction-type-detail.component';

import { TransactionTypeComponent } from './transaction-type/transaction-type.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';

const routes: Routes = [
    { path: 'tipo-transacao', component: TransactionTypeComponent },
    { path: 'tipo-transacao/detalhe', component: TransactionTypeDetailComponent },
    { path: 'tipo-transacao/criar', component: TransactionTypeDetailComponent },
    { path: 'transacoes', component: TransactionListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class FinanceRoutingModule { }
