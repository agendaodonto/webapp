import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClinicComponent } from './clinic.component';
import { ClinicDetailComponent } from './clinic-detail.component';
import { ClinicService } from './clinic.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { DentistService } from '../shared/services/dentist.service';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ConfirmDialogModule } from '../shared/components/confirm-dialog/confirm-dialog.module';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';

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
