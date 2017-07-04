import { Component, OnInit } from '@angular/core';
import { IPaginateEvent, ISortEvent } from 'app/shared/components/pager/datatable-pager.component';
import { ISchedule, ScheduleFilter, ScheduleService, ScheduleStatus } from 'app/schedule/schedule.service';

import { Observable } from 'rxjs/Rx';
import { format } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pendingSchedules: ISchedule[];
  isLoading = false;
  selectedSchedules: ISchedule[] = [];
  pageLimit = 10;
  scheduleCount = 0;
  orderBy = 'date'

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.getSchedules(0);
  }

  getSchedules(page: number) {
    this.isLoading = true;
    this.selectedSchedules = [];
    const filter = new ScheduleFilter()
    filter.setFilterValue('endDate', format(new Date(), 'YYYY-MM-DD'))
    filter.setFilterValue('status', ScheduleStatus.Pending.toString())
    filter.setFilterValue('orderBy', this.orderBy);
    filter.setFilterValue('offset', page.toString());
    this.scheduleService.getAll(filter)
      .finally(() => this.isLoading = false)
      .subscribe(schedules => {
        console.log(schedules);
        this.scheduleCount = schedules.count;
        this.pendingSchedules = schedules.results;
      });
  }

  setStatus(status: ScheduleStatus) {
    this.isLoading = true;
    const observables = [];
    this.selectedSchedules.forEach(schedule => {
      this.pendingSchedules = this.pendingSchedules.filter(e => e.id !== schedule.id);
      schedule.status = status;
      observables.push(this.scheduleService.save(schedule))
    });
    Observable.forkJoin(...observables).subscribe(() => this.getSchedules(0));
  }

  paginate(paginateEvent: IPaginateEvent) {
    this.getSchedules(paginateEvent.offset * paginateEvent.limit)
  }

  sort(sortEvent: ISortEvent) {
    this.orderBy = sortEvent.newValue === 'asc' ? sortEvent.column.prop : '-' + sortEvent.column.prop;
    this.getSchedules(0);
  }
}
