import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {} from '@angular/http'

@Injectable()
export class AuthHttp implements IAuthHttp {

    constructor(private http: HttpClient) {

    }

    private getHeaders(): { headers: HttpHeaders } {
        const token = localStorage.getItem('auth_token');
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        if (token) {
            headers = headers.append('Authorization', 'Token ' + token);
        }
        return { headers: headers };
    }

    get<T>(url: string, options?: IOptions): Observable<T> {
        console.log('Getting: ' + url);
        return this.http.get<T>(url, Object.assign(this.getHeaders(), options));
    }

    post<T>(url: string, body: any): Observable<T> {
        console.log('Posting: ' + url);
        return this.http.post<T>(url, body, this.getHeaders());
    }

    put<T>(url: string, body: any): Observable<T> {
        console.log('Putting: ' + url);
        return this.http.put<T>(url, body, this.getHeaders());
    }

    remove<T>(url: string): Observable<T> {
        console.log('Removing: ' + url);
        return this.http.delete<T>(url, this.getHeaders());
    }

    options<T>(url): Observable<T> {
        console.log('Options', url);
        return this.http.options<T>(url);
    }

}

@Injectable()
export class AuthHttpStub implements IAuthHttp {


    public get(_url: string, _options): Observable<Object> {
        throw new Error('Not implemented yet.');
    }

    public post(_url: string, _body: any): Observable<Object> {
        throw new Error('Not implemented yet.');
    }

    public put(_url: string, _body: any): Observable<Object> {
        throw new Error('Not implemented yet.');
    }

    public remove(_url: string): Observable<Object> {
        throw new Error('Not implemented yet.');
    }

    public options(_url: string): Observable<Object> {
        throw new Error('Not implemented yet.');
    }
}

interface IAuthHttp {
    get(url: string, options?: IOptions): Observable<Object>;
    post(url: string, body: any): Observable<Object>;
    put(url: string, body: any): Observable<Object>;
    remove(url: string): Observable<Object>;
    options(url: string): Observable<Object>;
}

interface IOptions {
    headers?: HttpHeaders,
    params?: HttpParams
}

export interface IPagedResponse<T> {
    count: number;
    results: T[];
}
