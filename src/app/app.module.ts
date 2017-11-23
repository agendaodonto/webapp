import { AboutModule, aboutRoutes } from 'app/about/about.module';
import { AccountModule, accountRoutes } from './account/account.module';
import { ClinicModule, clinicRoutes } from './clinic/clinic.module';
import { DashboardModule, dashboardRoutes } from 'app/dashboard/dashboard.module';
import { LoginModule, loginRoutes } from './login/login.module';
import { PatientModule, patientRoutes } from './patient/patient.module';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleModule, scheduleRoutes } from './schedule/schedule.module';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialAppModule } from './shared/material.app.module';
import { NgModule } from '@angular/core';
import { RegisterModule } from './register/register.module';
import { registerRoutes } from 'app/register/register.module';
import { AuthHttp } from 'app/shared/auth_http';

export const routes: Routes = [
    ...dashboardRoutes,
    ...clinicRoutes,
    ...loginRoutes,
    ...registerRoutes,
    ...patientRoutes,
    ...scheduleRoutes,
    ...aboutRoutes,
    ...accountRoutes
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        MaterialAppModule,
        // App Modules
        DashboardModule,
        RegisterModule,
        ClinicModule,
        LoginModule,
        PatientModule,
        ScheduleModule,
        AboutModule,
        AccountModule,
    ],
    providers: [AuthHttp],
    bootstrap: [AppComponent]
})
export class AppModule {
}
