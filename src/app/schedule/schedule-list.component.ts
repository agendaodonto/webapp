import * as moment from 'moment';

import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { ScheduleFilter, ScheduleService, ISchedule } from './schedule.service';

import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CustomFG, CustomFB } from '../shared/validation';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { startWith, switchMap, finalize, map } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator;
    displayedColumns = ['select', 'date', 'patient', 'status'];
    dataSource: ScheduleDatasource;
    ds: MatTableDataSource<ISchedule>;
    filterForm: CustomFG;
    scheduleFilter = new ScheduleFilter();
    scheduleCount: number;
    selection = new SelectionModel<ISchedule>(true);
    isUpdating = false;
    isLoading = false;
    eventWatcher: Observable<any>;
    filterChanges = new BehaviorSubject(null);

    constructor(
        private scheduleService: ScheduleService,
        private router: Router,
        private route: ActivatedRoute) {
        const fb = new CustomFB();
        this.filterForm = fb.group({
            startDate: [''],
            endDate: [''],
            status: ['']
        });
    }

    ngOnInit() {
        this.ds = new MatTableDataSource();
        this.eventWatcher = merge(this.paginator.page, this.filterChanges).pipe(
            startWith(null),
            switchMap(() => {
                this.isLoading = true;
                let offset = 0;
                offset = this.paginator.pageSize * this.paginator.pageIndex;
                this.scheduleFilter.setFilterValue('pageSize', this.paginator.pageSize.toString());
                this.scheduleFilter.setFilterValue('offset', offset.toString());
                return this.scheduleService.getAll(this.scheduleFilter).pipe(
                    finalize(() => this.isLoading = false),
                    map(response => {
                        this.scheduleCount = response.count;
                        if (this.scheduleCount < offset) {
                            this.paginator.pageIndex = 0;
                            this.filterChanges.next(null);
                        }
                        this.ds.data = response.results;
                        return response.results;
                    })
                );
            }));
        // this.dataSource = new ScheduleDatasource(this.scheduleService, this.paginator);
        this.setupUrlFilter();
    }

    filter() {
        const status = this.filterForm.controls.status.value;
        let startDate = this.filterForm.controls.startDate.value;
        let endDate = this.filterForm.controls.endDate.value;
        startDate = moment.isMoment(startDate) && startDate.isValid() ? startDate.format('DD-MM-YYYY') : '';
        endDate = moment.isMoment(endDate) && endDate.isValid() ? endDate.format('DD-MM-YYYY') : '';
        this.selection.clear();

        const navigationExtras = {
            queryParams: {
                dataInicio: startDate,
                dataFim: endDate,
                status: status
            }
        };
        this.router.navigate(['/agenda/lista'], navigationExtras);
    }

    private parseDate(date: string): moment.Moment {
        const dateMoment = moment(date, 'DD-MM-YYYY');
        return dateMoment;
    }

    setupUrlFilter() {
        this.route.queryParams.subscribe((route) => {
            const status = route.status;
            const startDate = this.parseDate(route.dataInicio);
            const endDate = this.parseDate(route.dataFim);

            this.filterForm.controls.status.setValue(status);
            this.filterForm.controls.startDate.setValue(startDate);
            this.filterForm.controls.endDate.setValue(endDate);
            this.dataSource.scheduleFilter.reset();
            this.dataSource.scheduleFilter.setFilterValue('status', status);
            if (startDate.isValid()) {
                this.dataSource.scheduleFilter.setFilterValue('startDate', startDate.format('YYYY-MM-DD'));
            }
            if (endDate.isValid()) {
                this.dataSource.scheduleFilter.setFilterValue('endDate', endDate.format('YYYY-MM-DD'));
            }
            this.dataSource.filterChanges.next(null);
        });
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.schedules.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.dataSource.schedules.forEach(row => this.selection.select(row));
        }
    }

    setScheduleStatus(status) {
        const jobs = [];
        this.isUpdating = true;
        this.selection.selected.forEach((schedule) => {
            const selectedSchedule = Object.assign({}, schedule); // Copy the object without reference
            selectedSchedule.status = status;
            jobs.push(this.scheduleService.save(selectedSchedule));
        });
        merge(...jobs)
            .pipe(finalize(() => {
                this.selection.clear();
                this.dataSource.filterChanges.next(null);
                this.isUpdating = false;
            })).subscribe();

    }
}

class ScheduleDatasource extends DataSource<ISchedule> {
    isLoading = true;
    count = 0;
    filterChanges = new BehaviorSubject(null);
    changeEvents = [this.paginator.page, this.filterChanges];
    scheduleFilter = new ScheduleFilter();
    schedules: ISchedule[];

    constructor(private scheduleService: ScheduleService, private paginator: MatPaginator) {
        super();
    }

    connect(_collectionViewer: CollectionViewer): Observable<ISchedule[]> {
        return merge(...this.changeEvents).pipe(
            startWith(null),
            switchMap(() => {
                this.isLoading = true;
                let offset = 0;
                offset = this.paginator.pageSize * this.paginator.pageIndex;
                this.scheduleFilter.setFilterValue('pageSize', this.paginator.pageSize.toString());
                this.scheduleFilter.setFilterValue('offset', offset.toString());
                return this.scheduleService.getAll(this.scheduleFilter).pipe(
                    finalize(() => this.isLoading = false),
                    map(response => {
                        this.count = response.count;
                        if (this.count < offset) {
                            this.paginator.pageIndex = 0;
                            this.filterChanges.next(null);
                        }
                        this.schedules = response.results;
                        return response.results;
                    })
                );
            }));
    }
    disconnect(_collectionViewer: CollectionViewer): void { }

}
