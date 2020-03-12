import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { TokenService } from '../shared/services/token.service';
import { CustomFB, CustomFG } from '../shared/validation';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    isSubmitting = false;
    loginForm: CustomFG;
    errors: string[] = [];

    constructor(private loginService: LoginService, private router: Router, private tokenService: TokenService) {
        this.loginForm = new CustomFB().group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        this.isSubmitting = true;
        this.loginService.authenticate(this.loginForm.value).pipe(
            finalize(() => this.isSubmitting = false),
        ).subscribe(
            response => {
                this.tokenService.setToken(response.auth_token);
                this.loginService.getUserInfo();
                this.router.navigate(['/dashboard']);
            },
            err => {
                if (err.error.hasOwnProperty('non_field_errors')) {
                    this.errors = err.error.non_field_errors;
                }
                this.loginForm.pushFieldErrors(err.error);
            },
        );

    }

}
