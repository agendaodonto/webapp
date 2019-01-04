import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as d3 from 'd3';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PatientFilter } from '../patient/patient.filter';
import { IPatient, PatientService } from '../patient/patient.service';
import { ScheduleFilter } from '../schedule/schedule.filter';
import { ISchedule, ScheduleService } from '../schedule/schedule.service';
import { IPagedResponse } from '../shared/interceptors/responses';
import { parseAttendanceData } from './dashboard.utils';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    pendingSchedules: Observable<IPagedResponse<ISchedule>>;
    schedules: Observable<IPagedResponse<ISchedule>>;
    refSchedules: Observable<IPagedResponse<ISchedule>>;
    patients: Observable<IPagedResponse<IPatient>>;
    attendance: Observable<any>;
    attendanceRatio: Observable<any>;
    date = subMonths(new Date(), 1);
    startDate = format(startOfMonth(this.date), 'YYYY-MM-DD');
    endDate = format(endOfMonth(this.date), 'YYYY-MM-DD');
    refDate = subMonths(new Date(), 2);
    refStartDate = format(startOfMonth(this.refDate), 'YYYY-MM-DD');
    refEndDate = format(endOfMonth(this.refDate), 'YYYY-MM-DD');
    curveFunction = d3.curveMonotoneX;
    attendanceChartColors = [
        { name: 'Comparecimentos', value: '#4CAF50' },
        { name: 'Faltas', value: '#f44336' },
        { name: 'Cancelamentos', value: '#e0e0e0' },
    ];

    constructor(private scheduleService: ScheduleService, private patientService: PatientService, private router: Router) { }

    ngOnInit() {
        this.setupObservables();
    }

    calculatePercentage(n1: number, n2: number) {
        if (n2 === 0) {
            return 0;
        }
        return Math.round(((n1 / n2) - 1) * 100);
    }

    setupObservables() {
        // Patients
        const patientFilter = new PatientFilter();
        patientFilter.setFilterValue('pageSize', '1');
        this.patients = this.patientService.getAll(patientFilter);
        // Pending Schedules
        const scheduleFilter = new ScheduleFilter();
        scheduleFilter.setFilterValue('pageSize', '1');
        scheduleFilter.setFilterValue('endDate', format(new Date(), 'YYYY-MM-DD'));
        scheduleFilter.setFilterValue('status', '0');
        this.pendingSchedules = this.scheduleService.getAll(scheduleFilter);
        // Schedules
        scheduleFilter.reset();
        scheduleFilter.setFilterValue('pageSize', '1');
        scheduleFilter.setFilterValue('startDate', this.startDate);
        scheduleFilter.setFilterValue('endDate', this.endDate);
        this.schedules = this.scheduleService.getAll(scheduleFilter);
        scheduleFilter.setFilterValue('startDate', this.refStartDate);
        scheduleFilter.setFilterValue('endDate', this.refEndDate);
        this.refSchedules = this.scheduleService.getAll(scheduleFilter);
        // Attendance
        this.attendance = this.scheduleService
            .getAttendanceData().pipe(
                map(data => {
                    return parseAttendanceData(data);
                }));
        this.attendanceRatio = this.scheduleService.getAttendanceData();
    }

    viewPendingSchedules() {
        const extras: NavigationExtras = {};
        extras.queryParams = {
            dataFim: format(new Date(), 'DD-MM-YYYY'),
            status: '0',
        };
        this.router.navigate(['/agenda/lista'], extras);
    }

    viewSchedules() {
        const extras: NavigationExtras = {};
        extras.queryParams = {
            dataInicio: format(startOfMonth(this.date), 'DD-MM-YYYY'),
            dataFim: format(endOfMonth(this.date), 'DD-MM-YYYY'),
        };
        this.router.navigate(['/agenda/lista'], extras);
    }

    viewPatients() {
        this.router.navigate(['/pacientes']);
    }

}
