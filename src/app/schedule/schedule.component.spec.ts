import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterLinkStubDirective, RouterStub } from 'app/shared/testing/stubs/router.stub';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CalendarModule } from 'angular-calendar/dist/esm/src';
import { MaterialAppModule } from '../shared/material.app.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from './schedule.service';
import { ScheduleServiceStub } from 'app/shared/testing/stubs/schedule.stub';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    const activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParams = { id: 1 };
    TestBed.configureTestingModule({
      imports: [MaterialAppModule, CalendarModule.forRoot()],
      declarations: [ScheduleComponent, RouterLinkStubDirective],
      providers: [
        { provide: ScheduleService, useClass: ScheduleServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
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
});
