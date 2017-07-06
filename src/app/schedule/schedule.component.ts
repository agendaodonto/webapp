import { CalendarDateFormatter, CalendarEvent } from 'angular-calendar';
import { Component, OnInit } from '@angular/core';
import { ScheduleFilter, ScheduleService } from './schedule.service';
import { addDays, addMinutes, addWeeks, endOfWeek, format, startOfWeek, subDays, subWeeks } from 'date-fns';

import { ActivatedRoute } from '@angular/router';
import { EventColor } from 'calendar-utils';
import { LocalizedCalendarHeader } from 'app/shared/components/providers/localizedheader.provider';
import { Router } from '@angular/router';

type ViewType = 'week' | 'day';

interface ScheduleEvent extends CalendarEvent {
    id: number;
}

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    providers: [
        {provide: CalendarDateFormatter, useClass: LocalizedCalendarHeader}
    ]
})
export class ScheduleComponent implements OnInit {
    static COLORS: EventColor[] = [
        { primary: '#1e90ff', secondary: '#D1E8FF' },
        { primary: '#39c052', secondary: '#c1f4be' },
        { primary: '#ad2121', secondary: '#f2b5b5' },
        { primary: '#4f4f4f', secondary: '#c2c2c2' },
    ];
    view: ViewType = 'week';
    currentDate: Date = new Date();
    schedules: ScheduleEvent[] = [];
    isLoading = true;

    constructor(private router: Router,
        private route: ActivatedRoute,
        // private location: Location,
        private scheduleService: ScheduleService,
        // public dialog: MdDialog
    ) {
    }

    ngOnInit() {
        this.getSchedules();
    }

    getSchedules() {
        this.isLoading = true;
        const filter = new ScheduleFilter();
        filter.setFilterValue('pageSize', '100');
        if (this.view === 'day') {
            filter.setFilterValue('startDate', format(this.currentDate, 'YYYY-MM-DD'))
            filter.setFilterValue('endDate', format(this.currentDate, 'YYYY-MM-DD'))
        } else {
            filter.setFilterValue('startDate', format(startOfWeek(this.currentDate), 'YYYY-MM-DD'))
            filter.setFilterValue('endDate', format(endOfWeek(this.currentDate), 'YYYY-MM-DD'))
        }
        this.scheduleService.getAll(filter)
            .finally(() => this.isLoading = false)
            .subscribe(schedules => {
                const tmpArray = [];
                schedules.results.map(schedule => {
                    const text = schedule.patient.name + ' ' + schedule.patient.last_name;
                    tmpArray.push({
                        id: schedule.id,
                        start: new Date(schedule.date),
                        end: addMinutes(new Date(schedule.date), schedule.duration),
                        title: text,
                        color: ScheduleComponent.COLORS[schedule.status],
                    });
                    this.schedules = tmpArray;
                });
                console.log(schedules);
            }
            );
    }

    setView(view: ViewType) {
        this.view = view;
        this.getSchedules();
    }

    increment() {
        const addFn = {
            week: addWeeks,
            day: addDays
        }[this.view];
        this.currentDate = addFn(this.currentDate, 1);
        this.getSchedules();
    }

    decrement() {
        const subFn = {
            week: subWeeks,
            day: subDays
        }[this.view];
        this.currentDate = subFn(this.currentDate, 1);
        this.getSchedules();
    }

    today() {
        this.currentDate = new Date();
        this.getSchedules();
    }

    eventClick({ event: event }) {
        this.router.navigate(['/agenda/', event.id]);
    }

}
