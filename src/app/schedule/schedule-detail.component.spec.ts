import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleDetailComponent } from './schedule-detail.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { ScheduleService } from './schedule.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PatientService } from '../patient/patient.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScheduleDetailComponent', () => {
    let component: ScheduleDetailComponent;
    let fixture: ComponentFixture<ScheduleDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                DirectivesModule,
                SharedComponentsModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [ScheduleDetailComponent],
            providers: [
                ScheduleService,
                PatientService
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
