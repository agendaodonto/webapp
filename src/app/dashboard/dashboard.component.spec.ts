import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { ScheduleService } from '../schedule/schedule.service';
import { ScheduleServiceStub } from 'app/shared/testing/stubs/schedule.stub';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PatientServiceStub } from 'app/shared/testing/stubs/patient.stub';
import { PatientService } from 'app/patient/patient.service';
import { Router } from '@angular/router';
import { RouterStub } from 'app/shared/testing/stubs/router.stub';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialAppModule, DirectivesModule, SharedComponentsModule, NgxChartsModule, NoopAnimationsModule],
            declarations: [DashboardComponent],
            providers: [
                { provide: ScheduleService, useClass: ScheduleServiceStub },
                { provide: PatientService, useClass: PatientServiceStub },
                { provide: Router, provideClass: RouterStub }
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
});
