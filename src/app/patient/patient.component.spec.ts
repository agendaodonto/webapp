import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterLinkStubDirective, RouterStub } from 'app/shared/testing/stubs/router.stub';

import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PatientComponent } from './patient.component';
import { PatientService } from './patient.service';
import { PatientServiceStub } from 'app/shared/testing/stubs/patient.stub';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule,MaterialAppModule, NgxDatatableModule, DataTablePagerModule],
      declarations: [PatientComponent, RouterLinkStubDirective],
      providers: [
        { provide: PatientService, useClass: PatientServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
