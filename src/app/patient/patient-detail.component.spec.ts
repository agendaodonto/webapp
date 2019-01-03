import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ClinicService } from '../clinic/clinic.service';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PatientDetailComponent } from './patient-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientService } from './patient.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientDetailComponent', () => {
    let component: PatientDetailComponent;
    let fixture: ComponentFixture<PatientDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                DirectivesModule,
                NgxDatatableModule,
                DataTablePagerModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [PatientDetailComponent],
            providers: [
                PatientService,
                ClinicService
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
