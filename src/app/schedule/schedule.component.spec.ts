import * as moment from 'moment';

import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MaterialAppModule } from '../shared/material.app.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from './schedule.service';
import { CalendarModule, MOMENT } from 'angular-calendar';

describe('ScheduleComponent', () => {
    let component: ScheduleComponent;
    let fixture: ComponentFixture<ScheduleComponent>;

    beforeEach(async(() => {
        route.testParams = {};
        TestBed.configureTestingModule({
            imports: [MaterialAppModule, CalendarModule.forRoot()],
            providers: [
                { provide: ActivatedRoute, useValue: route },
                { provide: MOMENT, useValue: moment}
            ]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load the date from URL', () => {
        // route.testParams = { view: 'dia', date: '2017-11-13' };
        expect(component.scheduleFilter.fields.find(v => v.name === 'startDate').value).toBe('2017-11-13');
        expect(component.scheduleFilter.fields.find(v => v.name === 'endDate').value).toBe('2017-11-13');
        // route.testParams = { view: 'semana', date: '2017-11-15' };
        expect(component.scheduleFilter.fields.find(v => v.name === 'startDate').value).toBe('2017-11-12');
        expect(component.scheduleFilter.fields.find(v => v.name === 'endDate').value).toBe('2017-11-18');
    });
});
