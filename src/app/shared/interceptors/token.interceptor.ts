import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { TokenService } from 'app/shared/services/token.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        })
        if (this.tokenService.isTokenAvailable()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${this.tokenService.getToken()}`
                }
            });
        }
        return next.handle(request);
    }
}
