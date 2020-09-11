import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ClinicService } from '../clinic/clinic.service';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { FinanceRoutingModule } from './finance-routing.module';
import { TransactionTypeService } from './shared/services/transaction-type.service';
import { TransactionTypeEffects } from './store/effects/transaction-type.effects';
import { transactionTypeReducer } from './store/reducers/transaction-type.reducer';
import { TransactionTypeListComponent } from './transaction-type/transaction-type-list/transaction-type-list.component';
import { TransactionTypeComponent } from './transaction-type/transaction-type.component';

@NgModule({
    imports: [
        CommonModule,
        FinanceRoutingModule,
        MaterialAppModule,
        FlexLayoutModule,
        SharedComponentsModule,
        StoreModule.forFeature('finance', { transactionTypes: transactionTypeReducer }),
        EffectsModule.forFeature([TransactionTypeEffects]),
    ],
    declarations: [
        TransactionTypeComponent,
        TransactionTypeListComponent,
    ],
    providers: [
        ClinicService,
        TransactionTypeEffects,
        TransactionTypeService,
    ],
})
export class FinanceModule { }
