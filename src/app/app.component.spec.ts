import { TestBed, async } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { MaterialAppModule } from './shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                LoginService,
                { provide: APP_BASE_HREF, useValue: '/' },
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

    it('should change the display type to mobile when the screen has less than 1600px', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.displayType).toBe('desktop');
        const resizeEvent = {
            type: 'resize',
            target: { innerWidth: 1600 }
        };
        app.onResize(resizeEvent);
        expect(app.displayType).toBe('mobile');
    }));

    it('should change the display type to desktop when the screen has more than 1600px', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.displayType).toBe('desktop');
        const resizeEvent = {
            type: 'resize',
            target: { innerWidth: 1601 }
        };
        app.onResize(resizeEvent);
        expect(app.displayType).toBe('desktop');
    }));

    it('should clear the localStorage and redirect to login after logout', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        const loginService = fixture.debugElement.injector.get(LoginService);
        const router = fixture.debugElement.injector.get(Router);
        spyOn(loginService, 'logout');
        spyOn(router, 'navigate').and.returnValue(true);
        app.logout();
        expect(loginService.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should close the sidenav only for mobile', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        spyOn(app.sideNav, 'close');
        app.closeSideNav();
        expect(app.sideNav.close).toHaveBeenCalledTimes(0);
        app.displayType = 'mobile';
        app.closeSideNav();
        expect(app.sideNav.close).toHaveBeenCalled();
    }));

    it('should only display menus that doesnt requires login', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        const loginService = fixture.debugElement.injector.get(LoginService);
        const loggedMenu = { name: 'TestMenu', link: 'aLink', requiresLogin: true, hideWhenLogged: false };
        const nonLoggedMenu = { name: 'TestMenu2', link: 'aLink2', requiresLogin: false, hideWhenLogged: true };
        spyOn(loginService, 'isLogged').and.returnValue(false);

        expect(app.shouldDisplayMenu(loggedMenu)).toBeFalsy();
        expect(app.shouldDisplayMenu(nonLoggedMenu)).toBeTruthy();
    }));

    it('should hide menus that requires login', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        const loginService = fixture.debugElement.injector.get(LoginService);
        const loggedMenu = { name: 'TestMenu', link: 'aLink', requiresLogin: true, hideWhenLogged: false };
        const nonLoggedMenu = { name: 'TestMenu2', link: 'aLink2', requiresLogin: false, hideWhenLogged: true };
        spyOn(loginService, 'isLogged').and.returnValue(true);

        expect(app.shouldDisplayMenu(loggedMenu)).toBeTruthy();
        expect(app.shouldDisplayMenu(nonLoggedMenu)).toBeFalsy();
    }));
});
