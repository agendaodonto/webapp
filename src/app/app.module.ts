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
import { MaterialAppModule } from './shared/material.app.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RegisterModule } from './register/register.module';
import { registerRoutes } from 'app/register/register.module';
import { AuthHttp } from 'app/shared/auth_http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtras from '@angular/common/locales/extra/pt';
// import { MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localePt, localePtExtras);

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
        RouterModule.forRoot(routes),
        MaterialAppModule,
        MatMomentDateModule,
        HttpClientModule,
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
    providers: [
        AuthHttp,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
