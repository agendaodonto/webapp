import { AuthGuard } from 'app/shared/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { DataTablePagerComponent } from '../shared/components/pager/datatable-pager.component';
import { DataTablePagerModule } from 'app/shared/components/pager/datatable-pager.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialAppModule } from 'app/shared/material.app.module';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable/release';
import { Routes } from '@angular/router';
import { ScheduleService } from 'app/schedule/schedule.service';

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
        NgxDatatableModule,
        DataTablePagerModule
    ],
    providers: [ScheduleService, AuthGuard],
})
export class DashboardModule {
}
