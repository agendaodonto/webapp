import { Component, OnInit, ViewChild } from '@angular/core';

import { LoginService } from './login/login.service';
import { MatSidenav } from '@angular/material';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

interface IMenu {
    name: string;
    link: string;
    requiresLogin: boolean;
    hideWhenLogged: boolean;
}

type Display = 'desktop' | 'mobile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: []
})
export class AppComponent implements OnInit {
    date = new Date();
    @ViewChild('sidenav') sideNav: MatSidenav;
    displayType: Display;
    sideNavMenus: IMenu[] = [
        { name: 'Dashboard', link: '/dashboard', requiresLogin: true, hideWhenLogged: false },
        { name: 'Clinicas', link: '/clinicas', requiresLogin: true, hideWhenLogged: false },
        { name: 'Pacientes', link: '/pacientes', requiresLogin: true, hideWhenLogged: false },
        { name: 'Agenda', link: '/agenda', requiresLogin: true, hideWhenLogged: false },
        { name: 'Login', link: '/login', requiresLogin: false, hideWhenLogged: true },
        { name: 'Sobre', link: '/sobre', requiresLogin: false, hideWhenLogged: false },
        // { name: 'Minha Conta', link: '/conta', requiresLogin: true, hideWhenLogged: false },
    ];

    constructor(public loginService: LoginService, private router: Router) {

    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        const resizeEvent = Observable.fromEvent(window, 'resize')
            .map(() => {
                return document.documentElement.clientWidth;
            })
            .startWith(document.documentElement.clientWidth)
            .debounceTime(200);

        resizeEvent.subscribe(data => {
            if (data > 1360) {
                this.displayType = 'desktop';
                this.sideNav.mode = 'side';
                this.sideNav.toggle(true);
            } else {
                this.displayType = 'mobile';
                this.sideNav.mode = 'over';
                this.sideNav.toggle(false);
            }
        });
    }

    closeSideNav() {
        if (this.displayType === 'mobile') {
            this.sideNav.close();
        }
    }

    getProfileUrl() {
        const userInfo = this.loginService.getLocalUserInfo();
        if (userInfo) {
            return Md5.hashAsciiStr(userInfo.email);
        } else {
            return Md5.hashAsciiStr('');
        }
    }

    displayMenu(menu: IMenu) {
        if (this.loginService.isLogged()) {
            return !menu.hideWhenLogged;
        } else {
            return !menu.requiresLogin;
        }
    }
}
