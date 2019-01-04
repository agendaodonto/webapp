import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';

import { NgModule } from '@angular/core';

const IMPORT_LIST = [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTooltipModule,
];
@NgModule({
    imports: [IMPORT_LIST],
    exports: [IMPORT_LIST],
})
export class MaterialAppModule {

}
