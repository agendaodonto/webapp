import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { Route, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/shared/guards/auth.guard';
import { CalendarModule } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgModule } from '@angular/core';
import { PatientService } from '../patient/patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule.component';
import { ScheduleDetailComponent } from './schedule-detail.component';
import { ScheduleService } from './schedule.service';
import { ScheduleListComponent } from './schedule-list.component';

export const scheduleRoutes: Route[] = [
    { path: 'agenda/criar', component: ScheduleDetailComponent, canActivate: [AuthGuard] },
    { path: 'agenda/lista', component: ScheduleListComponent, canActivate: [AuthGuard] },
    { path: 'agenda/:id', component: ScheduleDetailComponent, canActivate: [AuthGuard] },
    { path: 'agenda/:view/:date', component: ScheduleComponent, canActivate: [AuthGuard] },
    { path: 'agenda/:view', component: ScheduleComponent, canActivate: [AuthGuard] },
    { path: 'agenda', component: ScheduleComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        CommonModule,
        MaterialAppModule,
        RouterModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        DirectivesModule,
        SharedComponentsModule,
        CalendarModule.forRoot(),
    ],
    declarations: [ScheduleComponent, ScheduleDetailComponent, ScheduleListComponent],
    providers: [ScheduleService, PatientService, AuthGuard]
})
export class ScheduleModule {
}
