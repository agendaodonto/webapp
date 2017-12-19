import { Component, OnInit } from '@angular/core';
import { ScheduleService, ISchedule, ScheduleFilter } from 'app/schedule/schedule.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { IPatient, PatientFilter, PatientService } from 'app/patient/patient.service';
import { startOfMonth, endOfMonth, format, subMonths } from 'date-fns';
import { IPagedResponse } from 'app/shared/auth_http';
import * as d3 from 'd3';
import { parseAttendanceData } from 'app/dashboard/dashboard.utils';
import { Router, NavigationExtras } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    pendingSchedules: Observable<IPagedResponse<ISchedule>>;
    schedules: Observable<IPagedResponse<ISchedule>>;
    patients: Observable<IPagedResponse<IPatient>>;
    attendance: Observable<any>;
    attendanceRatio: Observable<any>;
    refDate = subMonths(new Date(), 1);
    startDate = format(startOfMonth(this.refDate), 'YYYY-MM-DD');
    endDate = format(endOfMonth(this.refDate), 'YYYY-MM-DD');
    curveFunction = d3.curveMonotoneX;
    attendanceChartColors = [
        { name: 'Comparecimentos', value: '#4CAF50' },
        { name: 'Faltas', value: '#f44336' },
        { name: 'Cancelamentos', value: '#e0e0e0' }
    ]

    constructor(private scheduleService: ScheduleService, private patientService: PatientService, private router: Router) { }

    ngOnInit() {
        this.setupObservables();
    }

    setupObservables() {
        // Patients
        const patientFilter = new PatientFilter();
        patientFilter.setFilterValue('pageSize', '1');
        this.patients = this.patientService.getAll(patientFilter)
        // Pending Schedules
        const scheduleFilter = new ScheduleFilter();
        scheduleFilter.setFilterValue('pageSize', '1')
        scheduleFilter.setFilterValue('endDate', format(new Date(), 'YYYY-MM-DD'))
        scheduleFilter.setFilterValue('status', '0')
        this.pendingSchedules = this.scheduleService.getAll(scheduleFilter);
        // Schedules
        scheduleFilter.reset();
        scheduleFilter.setFilterValue('pageSize', '1')
        scheduleFilter.setFilterValue('startDate', this.startDate)
        scheduleFilter.setFilterValue('endDate', this.endDate)
        this.schedules = this.scheduleService.getAll(scheduleFilter);
        // Attendance
        this.attendance = this.scheduleService
            .getAttendanceData()
            .map(data => {
                return parseAttendanceData(data)
            })
        this.attendanceRatio = this.scheduleService.getAttendanceData();
    }

    viewPendingSchedules() {
        const extras: NavigationExtras = {};
        extras.queryParams = {
            dataFim: format(new Date(), 'DD-MM-YYYY'),
            status: '0'
        }
        this.router.navigate(['/agenda/lista'], extras)
    }

    viewSchedules() {
        const extras: NavigationExtras = {};
        extras.queryParams = {
            dataInicio: format(startOfMonth(this.refDate), 'DD-MM-YYYY'),
            dataFim: format(endOfMonth(this.refDate), 'DD-MM-YYYY'),
            status: '0'
        }
        this.router.navigate(['/agenda/lista'], extras)
    }

    viewPatients() {
        this.router.navigate(['/pacientes'])
    }

}
