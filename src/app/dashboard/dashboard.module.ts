import { AuthGuard } from 'app/shared/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialAppModule } from 'app/shared/material.app.module';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ScheduleService } from 'app/schedule/schedule.service';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PatientService } from 'app/patient/patient.service';

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
        HttpModule,
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
