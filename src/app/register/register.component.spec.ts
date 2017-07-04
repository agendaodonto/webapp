import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DentistService } from 'app/shared/services/dentist.service';
import { DentistServiceStub } from '../shared/testing/stubs/dentist.stub';
import { MaterialAppModule } from 'app/shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            imports: [MaterialAppModule, ReactiveFormsModule, NoopAnimationsModule],
            providers: [
                { provide: DentistService, useClass: DentistServiceStub }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
