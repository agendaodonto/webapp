import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ClinicService } from '../clinic/clinic.service';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientService } from './patient.service';

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
                RouterTestingModule,
            ],
            declarations: [PatientDetailComponent],
            providers: [
                PatientService,
                ClinicService,
            ],
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
