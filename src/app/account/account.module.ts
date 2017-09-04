import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CommonModule } from '@angular/common';
import { DentistService } from '../shared/services/dentist.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

export const accountRoutes: Routes = [
    // { path: 'conta', component: AccountComponent, canActivate: [AuthGuard] }
]

@NgModule({
    imports: [CommonModule, MaterialAppModule, FlexLayoutModule, ReactiveFormsModule, RouterModule],
    declarations: [AccountComponent],
    providers: [DentistService]
})
export class AccountModule {

}
