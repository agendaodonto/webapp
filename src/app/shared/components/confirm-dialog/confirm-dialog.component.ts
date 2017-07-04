import { Component, Inject } from '@angular/core';

import { MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html'
})

export class ConfirmDialogComponent {
    constructor( @Inject(MD_DIALOG_DATA) public ref: any) {

    }
}