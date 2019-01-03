import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ClinicDetailComponent } from './clinic-detail.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ClinicService } from './clinic.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DentistService } from '../shared/services/dentist.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClinicDetailComponent', () => {
    let component: ClinicDetailComponent;
    let fixture: ComponentFixture<ClinicDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                DirectivesModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [ClinicDetailComponent],
            providers: [
                ClinicService,
                DentistService
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
