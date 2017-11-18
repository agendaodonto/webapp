import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthHttp implements IAuthHttp {

    constructor(private http: Http) {

    }

    private getHeaders(): RequestOptions {
        const token = localStorage.getItem('auth_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) {
            headers.append('Authorization', 'Token ' + token);
        }
        return new RequestOptions({ headers: headers });
    }

    get(url: string, options?: RequestOptions): Observable<Response> {
        console.log('Getting: ' + url);
        return this.http.get(url, this.getHeaders().merge(options));
    }

    post(url: string, body: any): Observable<Response> {
        console.log('Posting: ' + url);
        return this.http.post(url, body, this.getHeaders());
    }

    put(url: string, body: any): Observable<Response> {
        console.log('Putting: ' + url);
        return this.http.put(url, body, this.getHeaders());
    }

    remove(url: string): Observable<Response> {
        console.log('Removing: ' + url);
        return this.http.delete(url, this.getHeaders());
    }

    options(url): Observable<Response> {
        console.log('Options', url);
        return this.http.options(url);
    }

}

@Injectable()
export class AuthHttpStub implements IAuthHttp {


    public get(url: string, options: RequestOptions) {
        throw new Error('Not implemented yet.');
    }

    public post(url: string, body: any): Observable<Response> {
        throw new Error('Not implemented yet.');
    }

    public put(url: string, body: any): Observable<Response> {
        throw new Error('Not implemented yet.');
    }

    public remove(url: string): Observable<Response> {
        throw new Error('Not implemented yet.');
    }

    public options(url: string): Observable<Response> {
        throw new Error('Not implemented yet.');
    }
}

interface IAuthHttp {
    get(url: string, options?: RequestOptions);
    post(url: string, body: any): Observable<Response>;
    put(url: string, body: any): Observable<Response>;
    remove(url: string): Observable<Response>;
    options(url: string): Observable<Response>;
}

export interface IPagedResponse<T> {
    count: number;
    results: T[];
}

export interface IResponse<T> {
    T;
}
