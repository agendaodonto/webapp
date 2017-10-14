import { Component, OnInit } from '@angular/core';
import { CustomFG, ValidationService } from '../shared/validation';
import { FormGroup, Validators } from '@angular/forms';

import { CustomFB } from 'app/shared/validation';
import { DentistService } from '../shared/services/dentist.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    states = [];
    registerForm: CustomFG;
    isLoading = true;
    isSubmitting = false;
    errors: string[] = [];

    constructor(private dentistService: DentistService, private snackBar: MatSnackBar) {
        const fb = new CustomFB();
        this.registerForm = fb.group({
            email: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            cro: ['', Validators.required],
            cro_state: ['', Validators.required],
            sex: ['', Validators.required],
            password: fb.group({
                password: ['', Validators.required],
                confirm_password: ['', Validators.required],
            }, { validator: ValidationService.passwordCompareValidator })
        })
    }

    ngOnInit() {
        this.dentistService.getStates()
            .finally(() => this.isLoading = false)
            .subscribe(
            data => {
                this.states = data;
            });
    }

    onSubmit() {
        this.isSubmitting = true;
        this.errors = []
        const dentist = this.registerForm.value;
        dentist.password = dentist.password.password;
        this.dentistService.create(dentist)
            .finally(() => this.isSubmitting = false)
            .subscribe(
            data => {
                this.registerForm.reset();
                this.snackBar.open('Conta criada com sucesso. Verifique o seu email !')
            },
            errors => {
                errors = errors.json();
                this.registerForm.pushFieldErrors(errors);
                if (errors.hasOwnProperty('non_field_errors')) {
                    this.errors = errors.non_field_errors;
                }
            });
    }

}
