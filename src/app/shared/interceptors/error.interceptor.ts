import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // Do nothing for now
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status !== 400) {
                    this.snackBar.open('Aconteceu algo errado. Tente efetuar login novamente', 'Fechar', { duration: 3000 })
                }
            }
        });
    }
}
