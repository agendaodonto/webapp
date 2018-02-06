import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

    getToken(): string {
        return localStorage.getItem('auth_token');
    }

    setToken(token: string) {
        localStorage.setItem('auth_token', token);
    }

    isTokenAvailable(): boolean {
        return !!localStorage.getItem('auth_token');
    }

}
