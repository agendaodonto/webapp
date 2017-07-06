import { CommonModule } from '@angular/common';
import { DataTablePagerComponent } from './datatable-pager.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from 'app/shared/material.app.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MaterialAppModule],
    declarations: [DataTablePagerComponent],
    exports: [DataTablePagerComponent]

})
export class DataTablePagerModule {

}
