import { RouterModule, Routes } from '@angular/router';

import { AuthHttp } from '../shared/auth_http';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    providers: [LoginService, AuthHttp]
})
export class LoginModule {
}
