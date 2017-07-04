import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from 'app/shared/testing/stubs/router.stub';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ClinicDetailComponent } from './clinic-detail.component';
import { ClinicService } from './clinic.service';
import { ClinicServiceStub } from 'app/shared/testing/stubs/clinic.stub';
import { DentistService } from '../shared/services/dentist.service';
import { DentistServiceStub } from 'app/shared/testing/stubs/dentist.stub';
import { MaterialAppModule } from '../shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('ClinicDetailComponent', () => {
    let component: ClinicDetailComponent;
    let fixture: ComponentFixture<ClinicDetailComponent>;

    beforeEach(async(() => {
        const activatedRoute = new ActivatedRouteStub();
        activatedRoute.testParams = { id: 1 };
        TestBed.configureTestingModule({
            declarations: [ClinicDetailComponent],
            imports: [MaterialAppModule, ReactiveFormsModule, NoopAnimationsModule],
            providers: [
                { provide: ClinicService, useClass: ClinicServiceStub },
                { provide: DentistService, useClass: DentistServiceStub },
                { provide: Router, useValue: RouterStub },
                { provide: ActivatedRoute, useValue: activatedRoute },
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClinicDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a dentist to the list', () => {
        const dentist = DentistServiceStub.DENTISTS[1];
        component.addDentist(dentist);
        expect(component.clinicForm.controls.dentists.value.length).toBe(2);
        component.addDentist(dentist); // Shouldn't duplicate
        expect(component.clinicForm.controls.dentists.value.length).toBe(2);
    });
});
