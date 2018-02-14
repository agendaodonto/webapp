import { BaseService } from 'app/shared/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    authenticate(formData: { email: string, password: string }): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post(BaseService.API_AUTH_URL + 'login/', JSON.stringify(formData), { headers: headers });
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
    }

    isLogged(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    getUserInfo() {
        this.http.get(BaseService.API_AUTH_URL + 'me/').subscribe(
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
