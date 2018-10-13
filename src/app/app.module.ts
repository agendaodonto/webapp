import { AccountModule, accountRoutes } from './account/account.module';
import { ClinicModule, clinicRoutes } from './clinic/clinic.module';
import { LoginModule, loginRoutes } from './login/login.module';
import { PatientModule, patientRoutes } from './patient/patient.module';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleModule, scheduleRoutes } from './schedule/schedule.module';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialAppModule } from './shared/material.app.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RegisterModule, registerRoutes } from './register/register.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtras from '@angular/common/locales/extra/pt';
// import { MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { dashboardRoutes, DashboardModule } from './dashboard/dashboard.module';
import { aboutRoutes, AboutModule } from './about/about.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TokenService } from './shared/services/token.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

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
        TokenService,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
