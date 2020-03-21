import { createUser } from './data/builder';

export interface IUser {
    email: string;
    password: string;
    name: string;
    lastName: string;
    token: string;
}

export class Authentication {
    static cachedToken: string;
    static cachedUserData: object;
    static user: IUser;

    static setAuth() {
        if (this.cachedToken && this.cachedUserData) {
            this.setToken(this.cachedToken);
            this.setUserInfo(this.cachedUserData);
            return;
        }

        createUser();
    }

    static setToken(data: string): void {
        this.cachedToken = data;
        window.localStorage.setItem('auth_token', data);
    }

    static setUserInfo(data: object): void {
        this.cachedUserData = data;
        window.localStorage.setItem('user_info', JSON.stringify(data));
    }
}
