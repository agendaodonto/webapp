import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterLinkStubDirective, RouterStub, ActivatedRouteStub } from 'app/shared/testing/stubs/router.stub';

import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { HttpModule } from '@angular/http';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './patient.component';
import { PatientService } from './patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientServiceStub } from 'app/shared/testing/stubs/patient.stub';

describe('PatientComponent', () => {
    let component: PatientComponent;
    let fixture: ComponentFixture<PatientComponent>;
    const route = new ActivatedRouteStub()

    beforeEach(async(() => {
        route.testParams = {};
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, MaterialAppModule, NgxDatatableModule, DataTablePagerModule, ReactiveFormsModule],
            declarations: [PatientComponent, RouterLinkStubDirective],
            providers: [
                { provide: PatientService, useClass: PatientServiceStub },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useValue: route }
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
        route.testParams = { field: 'nome', value: 'Maria' };
        expect(component.filterForm.controls.field.value).toBe('fullName');
        expect(component.filterForm.controls.value.value).toBe('Maria');
    });
});
