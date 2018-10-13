import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { ScheduleService } from '../schedule/schedule.service';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { PatientService } from '../patient/patient.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialAppModule, DirectivesModule, SharedComponentsModule, NgxChartsModule, NoopAnimationsModule],
            declarations: [DashboardComponent],
            providers: [
            ]
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

    it('should display the percentage as zero when there is no data from previous month',  () => {
        expect(component.calculatePercentage(0, 1)).toBe(-100);
        expect(component.calculatePercentage(1, 0)).toBe(0);
    });
});
