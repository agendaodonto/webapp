import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterLinkStubDirective, RouterStub } from 'app/shared/testing/stubs/router.stub';

import { DirectivesModule } from '../shared/directives/directives.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { MaterialAppModule } from '../shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'app/shared/services/token.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent, RouterLinkStubDirective],
            imports: [HttpClientModule, MaterialAppModule, ReactiveFormsModule, NoopAnimationsModule, DirectivesModule],
            providers: [
                TokenService,
                LoginService,
                { provide: Router, useClass: RouterStub },
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
