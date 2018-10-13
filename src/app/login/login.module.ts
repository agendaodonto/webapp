import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../shared/services/token.service';

export const loginRoutes: Routes = [
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [
        CommonModule,
        MaterialAppModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [LoginComponent],
    providers: [LoginService, TokenService]
})
export class LoginModule {
}
