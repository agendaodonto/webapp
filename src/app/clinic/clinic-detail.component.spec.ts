import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ClinicDetailComponent } from './clinic-detail.component';
import { ClinicService } from './clinic.service';
import { DentistService } from '../shared/services/dentist.service';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteStub, RouterStub } from '../shared/testing/stubs/router.stub';
import { ClinicServiceStub } from '../shared/testing/stubs/clinic.stub';
import { DentistServiceStub } from '../shared/testing/stubs/dentist.stub';

describe('ClinicDetailComponent', () => {
    let component: ClinicDetailComponent;
    let fixture: ComponentFixture<ClinicDetailComponent>;

    beforeEach(async(() => {
        const activatedRoute = new ActivatedRouteStub();
        activatedRoute.testParams = { id: 2 };
        TestBed.configureTestingModule({
            declarations: [ClinicDetailComponent],
            imports: [MaterialAppModule, ReactiveFormsModule, NoopAnimationsModule, DirectivesModule],
            providers: [
                { provide: ClinicService, useClass: ClinicServiceStub },
                { provide: DentistService, useValue: DentistServiceStub },
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

});
