import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from 'app/shared/testing/stubs/router.stub';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ClinicService } from '../clinic/clinic.service';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { HttpModule } from '@angular/http';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientService } from 'app/patient/patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientServiceStub } from 'app/shared/testing/stubs/patient.stub';
import { ClinicServiceStub } from 'app/shared/testing/stubs/clinic.stub';

describe('PatientDetailComponent', () => {
    let component: PatientDetailComponent;
    let fixture: ComponentFixture<PatientDetailComponent>;

    beforeEach(async(() => {
        const route = new ActivatedRouteStub();
        route.testParams = { id: 1 };
        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                DirectivesModule,
                NgxDatatableModule,
                DataTablePagerModule,
            ],
            declarations: [PatientDetailComponent],
            providers: [
                { provide: PatientService, useClass: PatientServiceStub },
                { provide: ClinicService, useClass: ClinicServiceStub },
                { provide: Router, useValue: RouterStub },
                { provide: ActivatedRoute, useValue: route },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
