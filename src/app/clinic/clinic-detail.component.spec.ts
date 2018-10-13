import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ClinicDetailComponent } from './clinic-detail.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('ClinicDetailComponent', () => {
    let component: ClinicDetailComponent;
    let fixture: ComponentFixture<ClinicDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClinicDetailComponent],
            imports: [MaterialAppModule, ReactiveFormsModule, NoopAnimationsModule, DirectivesModule],
            providers: [
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
