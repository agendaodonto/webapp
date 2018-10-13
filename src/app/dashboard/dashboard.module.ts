import { BrowserModule } from '@angular/platform-browser';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MaterialAppModule } from '../shared/material.app.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { ScheduleService } from '../schedule/schedule.service';
import { PatientService } from '../patient/patient.service';

export const dashboardRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/dashboard', canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MaterialAppModule,
        FlexLayoutModule,
        DirectivesModule,
        SharedComponentsModule,
        NgxChartsModule
    ],
    providers: [ScheduleService, PatientService, AuthGuard],
})
export class DashboardModule {
}
