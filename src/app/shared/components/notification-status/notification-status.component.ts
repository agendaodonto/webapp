import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-notification-status',
    template: `<div class="circle" matTooltip="{{ getHintLabel() }}">
                <mat-icon class="centered" [ngStyle]="getIconStyle()">{{ getIcon() }}</mat-icon>
              </div>`,
    styleUrls: ['notification-status.component.scss']
})
export class NotificationStatusComponent {
    private static statusList = {
        AGENDADO: { hint: 'Sua mensagem está agendada, e assim que necessário será enviada', icon: 'schedule', iconStyle: {} },
        ENVIADO: { hint: 'Sua mensagem foi enviada com sucesso.', icon: 'done_all', iconStyle: {color: 'green'} },
        EXPIRADO: { hint: 'Sua mensagem expirou.', icon: 'block', iconStyle: {color: '#626262'} },
        FALHOU: { hint: 'Ocorreu um erro ao enviar sua mensagem', icon: 'error_outline', iconStyle: {color: 'red'} },
        DESCONHECIDO: { hint: 'Não sabemos o que aconteceu com a sua mensagem. :(', icon: 'warning', iconStyle: {color: '#FFEB3B'} },
    }

    @Input() status: string;

    static statusLookup(status: string) {
        let statusData = NotificationStatusComponent.statusList[status]
        if (statusData === undefined) {
            statusData = NotificationStatusComponent.statusList.DESCONHECIDO;
        }
        return statusData;
    }

    getHintLabel() {
        return NotificationStatusComponent.statusLookup(this.status).hint;
    }

    getStatusStyle() {
        return NotificationStatusComponent.statusLookup(this.status).style;
    }

    getIcon() {
        return NotificationStatusComponent.statusLookup(this.status).icon
    }

    getIconStyle() {
        return NotificationStatusComponent.statusLookup(this.status).iconStyle
    }
}
