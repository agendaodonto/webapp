import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionTypeComponent } from './transaction-type/transaction-type.component';

const routes: Routes = [
    { path: 'tipo-transacao', component: TransactionTypeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class FinanceRoutingModule { }
