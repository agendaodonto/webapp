import { LoadingOverlayDirective } from './loading-overlay-directive';
import { LoadingOverlayComponent } from '../components/loading-overlay/loading-overlay.component';
import { AutoFocusDirective } from './auto-focus.directive';
import { ButtonLoaderDirective } from './button-loader.directive';
import { MatSpinner } from '@angular/material';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

@NgModule({
    imports: [SharedComponentsModule],
    exports: [AutoFocusDirective, ButtonLoaderDirective, LoadingOverlayDirective],
    declarations: [AutoFocusDirective, ButtonLoaderDirective, LoadingOverlayDirective],
    entryComponents: [MatSpinner, LoadingOverlayComponent]
})
export class DirectivesModule {

}
