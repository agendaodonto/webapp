import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/shared/guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClinicComponent } from './clinic.component';
import { ClinicDetailComponent } from './clinic-detail.component';
import { ClinicService } from './clinic.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from 'app/shared/components/confirm-dialog/confirm-dialog.module';
import { DataTablePagerModule } from 'app/shared/components/pager/datatable-pager.module';
import { DentistService } from '../shared/services/dentist.service';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';

export const clinicRoutes: Routes = [
    { path: 'clinicas', component: ClinicComponent, canActivate: [AuthGuard] },
    { path: 'clinicas/:id', component: ClinicDetailComponent, canActivate: [AuthGuard] },
    { path: 'clinicas/criar', component: ClinicDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        CommonModule,
        MaterialAppModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        FlexLayoutModule,
        RouterModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        DataTablePagerModule,
        DirectivesModule
    ],
    declarations: [ClinicComponent, ClinicDetailComponent],
    providers: [ClinicService, DentistService, AuthGuard],
    entryComponents: [ConfirmDialogComponent]
})
export class ClinicModule {
}
