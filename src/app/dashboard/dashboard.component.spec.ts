import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { PatientService } from '../patient/patient.service';
import { ScheduleService } from '../schedule/schedule.service';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialAppModule,
                DirectivesModule,
                SharedComponentsModule,
                NgxChartsModule,
                NoopAnimationsModule,
                RouterTestingModule,
            ],
            declarations: [DashboardComponent],
            providers: [ScheduleService, PatientService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the percentage as zero when there is no data from previous month', () => {
        expect(component.calculatePercentage(0, 1)).toBe(-100);
        expect(component.calculatePercentage(1, 0)).toBe(0);
    });
});
