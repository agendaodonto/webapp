import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DentistService } from 'app/shared/services/dentist.service';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from 'app/shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { DentistServiceStub } from 'app/shared/testing/stubs/dentist.stub';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            imports: [MaterialAppModule, ReactiveFormsModule, NoopAnimationsModule, DirectivesModule],
            providers: [
                { provide: DentistService, useClass: DentistServiceStub }
            ]
        }).compileComponents();
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
