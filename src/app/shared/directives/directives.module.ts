import { LoadingOverlayDirective } from './loading-overlay-directive';
import { LoadingOverlayComponent } from '../components/loading-overlay/loading-overlay.component';
import { LoadingOverlayModule } from '../components/loading-overlay/loading-overlay.module';
import { AutoFocusDirective } from './auto-focus.directive';
import { ButtonLoaderDirective } from './button-loader.directive';
import { MatSpinner } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [LoadingOverlayModule],
    exports: [AutoFocusDirective, ButtonLoaderDirective, LoadingOverlayDirective],
    declarations: [AutoFocusDirective, ButtonLoaderDirective, LoadingOverlayDirective],
    entryComponents: [MatSpinner, LoadingOverlayComponent]
})
export class DirectivesModule {

}
