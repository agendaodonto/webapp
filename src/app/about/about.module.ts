import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MaterialAppModule } from '../shared/material.app.module';

export const aboutRoutes: Routes = [
    { path: 'sobre', component: AboutComponent }
];

@NgModule({
    imports: [
        CommonModule, MaterialAppModule, RouterModule, FlexLayoutModule
    ],
    declarations: [AboutComponent]
})
export class AboutModule { }
