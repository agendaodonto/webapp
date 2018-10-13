import { CommonModule } from '@angular/common';
import { DataTablePagerComponent } from './datatable-pager.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MaterialAppModule } from '../../material.app.module';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MaterialAppModule],
    declarations: [DataTablePagerComponent],
    exports: [DataTablePagerComponent]

})
export class DataTablePagerModule {

}
