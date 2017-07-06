import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from 'app/shared/material.app.module';
import { NgModule } from '@angular/core';

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
