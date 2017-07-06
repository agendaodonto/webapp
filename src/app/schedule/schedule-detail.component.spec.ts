import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from 'app/shared/testing/stubs/router.stub';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MaterialAppModule } from '../shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PatientService } from '../patient/patient.service';
import { PatientServiceStub } from 'app/shared/testing/stubs/patient.stub';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleDetailComponent } from './schedule-detail.component';
import { ScheduleService } from './schedule.service';
import { ScheduleServiceStub } from 'app/shared/testing/stubs/schedule.stub';

describe('ScheduleDetailComponent', () => {
  let component: ScheduleDetailComponent;
  let fixture: ComponentFixture<ScheduleDetailComponent>;

  beforeEach(async(() => {
    const route = new ActivatedRouteStub();
    route.testParams = { id: 1 };
    TestBed.configureTestingModule({
      imports: [MaterialAppModule, ReactiveFormsModule, NoopAnimationsModule],
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
