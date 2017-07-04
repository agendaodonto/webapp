import { LoginService, LoginServiceStub } from './login/login.service';
import { TestBed, async } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { MaterialAppModule } from './shared/material.app.module';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                MaterialAppModule,
                RouterModule.forRoot([])
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: LoginService, useValue: LoginServiceStub }
            ]
        });
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
