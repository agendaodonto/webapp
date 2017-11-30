import { TestBed, async } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginService, LoginServiceStub } from './login/login.service';
import { MaterialAppModule } from './shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                MaterialAppModule,
                NoopAnimationsModule,
                RouterModule.forRoot([]),
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: LoginService, useClass: LoginServiceStub }
            ]
        });
    }));

    beforeEach(() => {
    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    }));
});
