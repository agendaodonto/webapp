import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { finalize, map, startWith, switchMap } from 'rxjs/operators';

import { ScheduleFilter } from './schedule.filter';
import { ISchedule, ScheduleService } from './schedule.service';

export class ScheduleDatasource extends DataSource<ISchedule> {
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
        return merge(...this.changeEvents).pipe(startWith(null), switchMap(() => {
            this.isLoading = true;
            let offset = 0;
            offset = this.paginator.pageSize * this.paginator.pageIndex;
            this.scheduleFilter.setFilterValue('pageSize', this.paginator.pageSize.toString());
            this.scheduleFilter.setFilterValue('offset', offset.toString());
            return this.scheduleService.getAll(this.scheduleFilter).pipe(finalize(() => this.isLoading = false), map((response) => {
                this.count = response.count;
                if (this.count < offset) {
                    this.paginator.pageIndex = 0;
                    this.filterChanges.next(null);
                }
                this.schedules = response.results;
                return response.results;
            }));
        }));
    }
    disconnect(_collectionViewer: CollectionViewer): void { }
}
