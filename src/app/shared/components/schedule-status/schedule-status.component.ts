import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-schedule-status',
    template: `<mat-chip-list>
                <mat-chip [ngStyle]="getStatusStyle()"> {{ getStatusLabel() }}</mat-chip>
              </mat-chip-list>`
})
export class ScheduleStatusComponent {
    private static statusList = {
        0: { label: 'Agendado', style: { 'background-color': '#2196f3', 'color': 'white'} },
        1: { label: 'Compareceu', style: { 'background-color': '#4CAF50', 'color': 'white' } },
        2: { label: 'Faltou', style: { 'background-color': '#f44336', 'color': 'white' } },
        3: { label: 'Cancelou', style: { 'background-color': '#e0e0e0' } }
    }

    @Input() status: number;
    constructor() { }

    getStatusLabel() {
        return ScheduleStatusComponent.statusList[this.status].label;
    }

    getStatusStyle() {
        return ScheduleStatusComponent.statusList[this.status].style;
    }
}
