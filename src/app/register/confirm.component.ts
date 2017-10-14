import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DentistService } from 'app/shared/services/dentist.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-confirm',
    template: ''
})
export class ConfirmComponent implements OnInit {

    constructor(
        private router: Router,
        private dentistService: DentistService,
        private route: ActivatedRoute,
        private snack: MatSnackBar) { }

    ngOnInit() {
        const uid = this.route.snapshot.params['uid']
        const token = this.route.snapshot.params['token']
        this.dentistService.activate(uid, token)
            .subscribe(
            data => {
                this.snack.open('Conta ativada com sucesso !', 'Fechar')
                this.router.navigate(['/login'])
            },
            error => {
                this.snack.open('Não foi possível ativar essa conta. Tente novamente', 'Fechar')
                this.router.navigate(['/login'])
            }
            )
    }

}
