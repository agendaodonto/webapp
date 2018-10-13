import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './patient.component';
import { PatientService } from './patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

describe('PatientComponent', () => {
    let component: PatientComponent;
    let fixture: ComponentFixture<PatientComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, MaterialAppModule, NgxDatatableModule, DataTablePagerModule, ReactiveFormsModule],
            declarations: [PatientComponent],
            providers: [
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

    it('should load filter from URL', () => {
        // route.testParams = { field: 'nome', value: 'Maria' };
        // expect(component.filterForm.controls.field.value).toBe('fullName');
        // expect(component.filterForm.controls.value.value).toBe('Maria');
    });
});
