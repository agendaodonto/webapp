import {Headers, Http} from '@angular/http';

import {AuthHttp} from '../shared/auth_http';
import {BaseService} from 'app/shared/services/base.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService extends BaseService implements ILoginService {

    constructor(private http: Http, private authHttp: AuthHttp) {
        super();
    }

    authenticate(formData: { email: string, password: string }): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(BaseService.API_AUTH_URL + 'login/', JSON.stringify(formData), {headers: headers})
            .map(data => data.json());
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
    }

    setToken(token: string) {
        localStorage.setItem('auth_token', token);
    }

    isLogged(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    getUserInfo() {
        this.authHttp.get(BaseService.API_AUTH_URL + 'me/').map(data => data.json()).subscribe(
            response => {
                localStorage.setItem('user_info', JSON.stringify(response));
                return JSON.parse(localStorage.getItem('user_info'));
            }
        );
    }

    getLocalUserInfo() {
        return JSON.parse(localStorage.getItem('user_info'));
    }
}

@Injectable()
export class LoginServiceStub implements ILoginService {
    authenticate(_formData: { email: string; password: string; }): Observable<any> {
        return Observable.of([{auth_token: 'TEST_TOKEN'}]);
    }

    setToken(token: string) {
        localStorage.setItem('auth_token', token);
    }

    isLogged(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    getUserInfo() {
        if (localStorage.getItem('user_info')) {
            return JSON.parse(localStorage.getItem('user_info'));
        } else {
            localStorage.setItem('user_info', JSON.stringify({
                first_name: 'John',
                last_name: 'Snow',
                cro: '123456',
                cro_state: 'SP',
                sex: 'M',
                id: 1,
                email: 'john@snow.com'
            }));
            return JSON.parse(localStorage.getItem('user_info'));
        }

    }


}

interface ILoginService {
    authenticate(formData: { email: string, password: string }): Observable<any>;
    setToken(token: string);
    isLogged(): boolean;
    getUserInfo();
}
