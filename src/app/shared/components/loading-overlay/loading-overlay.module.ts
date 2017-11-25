import { LoadingOverlayComponent } from './loading-overlay.component';
import { NgModule } from '@angular/core';
import { MaterialAppModule } from 'app/shared/material.app.module';


@NgModule({
    imports: [MaterialAppModule],
    exports: [LoadingOverlayComponent],
    declarations: [LoadingOverlayComponent],
})
export class LoadingOverlayModule { }
