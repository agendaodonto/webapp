import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from 'app/shared/testing/stubs/router.stub';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ConfirmComponent } from 'app/register/confirm.component';
import { DentistService } from 'app/shared/services/dentist.service';
import { HttpModule } from '@angular/http';
import { MaterialAppModule } from 'app/shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DentistServiceStub } from 'app/shared/testing/stubs/dentist.stub';

describe('ConfirmComponent', () => {
    let component: ConfirmComponent;
    let fixture: ComponentFixture<ConfirmComponent>;

    beforeEach(async(() => {
        const route = new ActivatedRouteStub();
        route.testParams = { uid: 1, token: 'abc' };
        TestBed.configureTestingModule({
            declarations: [ConfirmComponent],
            imports: [MaterialAppModule, NoopAnimationsModule],
            providers: [
                { provide: DentistService, useClass: DentistServiceStub },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useValue: route }
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
