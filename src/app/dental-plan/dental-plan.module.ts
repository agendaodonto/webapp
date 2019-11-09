import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { DentalPlanDetailComponent } from './dental-plan-detail/dental-plan-detail.component';
import { DentalPlanComponent } from './dental-plan/dental-plan.component';

export const dentalPlanRoutes: Routes = [
    { path: 'planos', component: DentalPlanComponent },
    { path: 'planos/:id', component: DentalPlanDetailComponent },
    { path: 'planos/novo', component: DentalPlanDetailComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialAppModule,
        ReactiveFormsModule,
        DirectivesModule,
        FlexLayoutModule,
    ],
    declarations: [DentalPlanComponent, DentalPlanDetailComponent],
})
export class DentalPlanModule { }
