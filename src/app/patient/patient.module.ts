import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientService } from './patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ClinicService } from '../clinic/clinic.service';

export const patientRoutes: Routes = [
    { path: 'pacientes', component: PatientComponent, canActivate: [AuthGuard] },
    { path: 'pacientes/:field/:value', component: PatientComponent, canActivate: [AuthGuard] },
    { path: 'pacientes/:id', component: PatientDetailComponent, canActivate: [AuthGuard] },
    { path: 'pacientes/novo', component: PatientDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialAppModule,
        RouterModule,
        FlexLayoutModule,
        NgxDatatableModule,
        DataTablePagerModule,
        DirectivesModule
    ],
    declarations: [PatientComponent, PatientDetailComponent],
    providers: [PatientService, ClinicService, AuthGuard]
})
export class PatientModule {

}
