import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialAppModule } from '../../material.app.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    imports: [MaterialAppModule, FlexLayoutModule],
    exports: [],
    declarations: [ConfirmDialogComponent],
    providers: [],
})
export class ConfirmDialogModule { }
