import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';
import { ClinicService } from '../clinic/clinic.service';
import { DentalPlanFilter } from '../dental-plan/dental-plan.filter';
import { DentalPlanService, IDentalPlan } from '../dental-plan/dental-plan.service';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientService } from './patient.service';

describe('PatientDetailComponent', () => {
    let component: PatientDetailComponent;
    let fixture: ComponentFixture<PatientDetailComponent>;
    let dentalPlanService: DentalPlanService;

    configureTestSuite(() => {
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
                DentalPlanService,
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientDetailComponent);
        component = fixture.componentInstance;
        dentalPlanService = fixture.componentRef.injector.get(DentalPlanService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return an empty string to when calling displayPatient without args', () => {
        const value = component.displayPlan();
        expect(value).toEqual('');
    });

    it('should return the plan name if plan is provided to displayPatient', () => {
        const plan: IDentalPlan = { name: 'some name' };
        const value = component.displayPlan(plan);
        expect(value).toEqual(plan.name);
    });

    it('should return the actual string if provided as argument to displayPatient', () => {
        const value = component.displayPlan('some string');
        expect(value).toEqual('some string');
    });

    it('should search for dental plans when the dental_plan field is updated with a string', fakeAsync(() => {
        const getAllSpy = spyOn(dentalPlanService, 'getAll');
        const createSpy = spyOn(dentalPlanService, 'create');

        component.patientForm.controls.dental_plan.setValue('some string');
        tick(100);

        expect(getAllSpy).toHaveBeenCalled();
        expect(createSpy).not.toHaveBeenCalled();
        const filter = getAllSpy.calls.mostRecent().args[0] as DentalPlanFilter;
        expect(filter.getFilterValue('name')).toEqual('some string');
    }));

    it('should do nothing when the dental_plan field is set with a entity containing a id', fakeAsync(() => {
        const getAllSpy = spyOn(dentalPlanService, 'getAll');
        const createSpy = spyOn(dentalPlanService, 'create');
        const dentalPlan: IDentalPlan = { id: 1, name: 'some name' };

        component.patientForm.controls.dental_plan.setValue(dentalPlan);
        tick(100);

        expect(getAllSpy).not.toHaveBeenCalled();
        expect(createSpy).not.toHaveBeenCalled();
    }));

    it('should create a dental plan when the dental_plan field is set with a entity without id', fakeAsync(() => {
        const getAllSpy = spyOn(dentalPlanService, 'getAll');
        const createSpy = spyOn(dentalPlanService, 'create').and.returnValue(of({ name: 'name' }));
        const dentalPlan: IDentalPlan = { name: 'some name' };

        component.patientForm.controls.dental_plan.setValue(dentalPlan);
        tick(100);
        expect(getAllSpy).not.toHaveBeenCalled();
        expect(createSpy).toHaveBeenCalledWith(dentalPlan);
        discardPeriodicTasks();
    }));
});
