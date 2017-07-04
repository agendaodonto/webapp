import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from '../../material.app.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MaterialAppModule, FlexLayoutModule],
    exports: [],
    declarations: [ConfirmDialogComponent],
    providers: [],
})
export class ConfirmDialogModule { }
