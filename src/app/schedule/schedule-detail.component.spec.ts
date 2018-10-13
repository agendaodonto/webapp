import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PatientService } from '../patient/patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleDetailComponent } from './schedule-detail.component';
import { ScheduleService } from './schedule.service';
import { ActivatedRouteStub, RouterStub } from '../shared/testing/stubs/router.stub';
import { ScheduleServiceStub } from '../shared/testing/stubs/schedule.stub';
import { PatientServiceStub } from '../shared/testing/stubs/patient.stub';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

describe('ScheduleDetailComponent', () => {
    let component: ScheduleDetailComponent;
    let fixture: ComponentFixture<ScheduleDetailComponent>;
    const route = new ActivatedRouteStub();

    beforeEach(async(() => {
        route.testParams = { id: 1 };
        TestBed.configureTestingModule({
            imports: [MaterialAppModule, ReactiveFormsModule, NoopAnimationsModule, DirectivesModule, SharedComponentsModule],
            declarations: [ScheduleDetailComponent],
            providers: [
                { provide: ScheduleService, useClass: ScheduleServiceStub },
                { provide: PatientService, useClass: PatientServiceStub },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useValue: route },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
