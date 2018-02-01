import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFB, CustomFG } from '../shared/validation';
import { TokenService } from 'app/shared/services/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    isLoading = false;
    loginForm: CustomFG;
    errors: Array<string> = [];

    constructor(private loginService: LoginService, private router: Router, private tokenService: TokenService) {
        this.loginForm = new CustomFB().group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.loginService.authenticate(this.loginForm.value)
            .finally(() => this.isLoading = false)
            .subscribe(
            response => {
                this.tokenService.setToken(response.auth_token);
                this.loginService.getUserInfo();
                this.router.navigate(['/dashboard']);
            },
            err => {
                const errors = err.json();
                if (errors.hasOwnProperty('non_field_errors')) {
                    this.errors = errors.non_field_errors;
                }
                this.loginForm.pushFieldErrors(errors);

            }
            );

    }

}
