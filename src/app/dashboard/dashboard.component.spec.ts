import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { ScheduleService } from '../schedule/schedule.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PatientService } from '../patient/patient.service';
import { RouterTestingModule } from '@angular/router/testing';

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
                RouterTestingModule
            ],
            declarations: [DashboardComponent],
            providers: [ScheduleService, PatientService]
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
