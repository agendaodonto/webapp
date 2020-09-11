import { Component, Input, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: ['empty-state.component.scss'],
})
export class EmptyStateComponent {

    @Input()
    image: string;

    getImagePath(): string {
        return `/assets/images/${this.image}.png`;
    }
}
