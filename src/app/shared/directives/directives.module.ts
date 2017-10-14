import { AutoFocusDirective } from './auto-focus.directive';
import { ButtonLoaderDirective } from './button-loader.directive';
import { MatSpinner } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [AutoFocusDirective, ButtonLoaderDirective],
    exports: [AutoFocusDirective, ButtonLoaderDirective],
    entryComponents: [MatSpinner]
})
export class DirectivesModule {

}
