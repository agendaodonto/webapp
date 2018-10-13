import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { DentistService } from '../shared/services/dentist.service';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { Routes } from '@angular/router';
import { MaterialAppModule } from '../shared/material.app.module';

export const registerRoutes: Routes = [
    { path: 'cadastro', component: RegisterComponent },
    { path: 'cadastro/ativar/:uid/:token', component: ConfirmComponent },
];

@NgModule({
    imports: [
        CommonModule, MaterialAppModule, FlexLayoutModule, ReactiveFormsModule, DirectivesModule
    ],
    declarations: [RegisterComponent, ConfirmComponent],
    exports: [RegisterComponent, ConfirmComponent],
    providers: [DentistService]
})
export class RegisterModule { }
