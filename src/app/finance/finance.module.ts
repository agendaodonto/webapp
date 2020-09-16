import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ClinicService } from '../clinic/clinic.service';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { FinanceRoutingModule } from './finance-routing.module';
import { TransactionTypeService } from './shared/services/transaction-type.service';
import { ClinicEffects } from './store/effects/clinic.effect';
import { TransactionTypeEffects } from './store/effects/transaction-type.effects';
import { clinicReducer } from './store/reducers/clinic.reducer';
import { transactionTypeReducer } from './store/reducers/transaction-type.reducer';
import {
    TransactionTypeDetailComponent,
} from './transaction-type/transaction-type-detail/transaction-type-detail.component';
import { TransactionTypeListComponent } from './transaction-type/transaction-type-list/transaction-type-list.component';
import { TransactionTypeComponent } from './transaction-type/transaction-type.component';

@NgModule({
    imports: [
        CommonModule,
        FinanceRoutingModule,
        MaterialAppModule,
        FlexLayoutModule,
        SharedComponentsModule,
        StoreModule.forFeature('finance', { transactionTypes: transactionTypeReducer, clinic: clinicReducer }),
        EffectsModule.forFeature([TransactionTypeEffects, ClinicEffects]),
        FormsModule,
        DirectivesModule,
        ReactiveFormsModule,
    ],
    declarations: [
        TransactionTypeComponent,
        TransactionTypeListComponent,
        TransactionTypeDetailComponent,
    ],
    providers: [
        ClinicService,
        TransactionTypeEffects,
        TransactionTypeService,
    ],
})
export class FinanceModule { }
