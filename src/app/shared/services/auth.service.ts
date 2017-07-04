import 'rxjs/add/operator/map';

import { Headers, Http } from '@angular/http';

import { AuthHttp } from '../auth_http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService extends BaseService {

    constructor(private http: Http, private authHttp: AuthHttp) {
        super();

    }

    login(loginData): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(
            BaseService.API_AUTH_URL + 'login/',
            JSON.stringify(loginData),
            { headers: headers })
            .map(data => data.json());
    }

    getUserData(): Observable<any> {
        return this.authHttp.get(BaseService.API_AUTH_URL + 'me/').map(data => data.json());
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    }

    isLogged(): boolean {
        const token = localStorage.getItem('auth_token');
        return !!token;
    }


    saveToken(token: string): void {
        localStorage.setItem('auth_token', token);
    }

    saveUserData(userData: any) {
        localStorage.setItem('user_data', userData);
    }

    getLocalUserData(): any {
        return JSON.parse(localStorage.getItem('user_data'));
    }


}
