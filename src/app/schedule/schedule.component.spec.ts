import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterLinkStubDirective, RouterStub } from 'app/shared/testing/stubs/router.stub';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';

import { CalendarModule } from 'angular-calendar';
import { MaterialAppModule } from '../shared/material.app.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from './schedule.service';
import { ScheduleServiceStub } from 'app/shared/testing/stubs/schedule.stub';

describe('ScheduleComponent', () => {
    let component: ScheduleComponent;
    let fixture: ComponentFixture<ScheduleComponent>;
    const route = new ActivatedRouteStub();

    beforeEach(async(() => {
        route.testParams = {};
        TestBed.configureTestingModule({
            imports: [MaterialAppModule, CalendarModule.forRoot()],
            declarations: [ScheduleComponent, RouterLinkStubDirective],
            providers: [
                { provide: ScheduleService, useClass: ScheduleServiceStub },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useValue: route },
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
        route.testParams = { view: 'dia', date: '2017-11-13' }
        expect(component.scheduleFilter.fields.find(v => v.name === 'startDate').value).toBe('2017-11-13');
        expect(component.scheduleFilter.fields.find(v => v.name === 'endDate').value).toBe('2017-11-13');
        route.testParams = { view: 'semana', date: '2017-11-15' }
        expect(component.scheduleFilter.fields.find(v => v.name === 'startDate').value).toBe('2017-11-12');
        expect(component.scheduleFilter.fields.find(v => v.name === 'endDate').value).toBe('2017-11-18');
    });
});
