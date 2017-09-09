import {
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdOptionModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
} from '@angular/material';

import { NgModule } from '@angular/core';

const IMPORT_LIST = [
    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    MdAutocompleteModule,
    MdIconModule,
    MdInputModule,
    MdSidenavModule,
    MdListModule,
    MdToolbarModule,
    MdSnackBarModule,
    MdOptionModule,
    MdSelectModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdDialogModule,
    MdTabsModule,
    MdSlideToggleModule
];
@NgModule({
    imports: [IMPORT_LIST],
    exports: [IMPORT_LIST]
})
export class MaterialAppModule {

}
