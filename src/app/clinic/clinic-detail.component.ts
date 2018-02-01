import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomFB, CustomFG } from '../shared/validation';
import { DentistService, IDentist } from '../shared/services/dentist.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ClinicService } from './clinic.service';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-clinic-detail',
    templateUrl: './clinic-detail.component.html',
    styleUrls: ['./clinic-detail.component.scss']
})
export class ClinicDetailComponent implements OnInit {
    clinicId: number;
    isLoading = true;
    isSubmitting = false;
    errors: string[];
    clinicForm: CustomFG;
    dentistCompleter = new FormControl();
    filteredOptions: Observable<IDentist[]>;

    constructor(private clinicService: ClinicService,
        private dentistService: DentistService,
        private router: Router,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar,
        public dialog: MatDialog) {
        this.clinicForm = new CustomFB().group({
            id: [''],
            name: ['', Validators.required],
            dentists: [[]]
        });
    }

    ngOnInit() {
        this.clinicId = +this.route.snapshot.params['id'];
        if (this.clinicId) {
            this.clinicService.get(this.clinicId)
                .finally(() => this.isLoading = false)
                .subscribe(
                response => {
                    this.clinicForm.setValue({
                        id: response.id,
                        name: response.name,
                        dentists: response.dentists
                    });
                }
                );
        } else {
            this.isLoading = false;
        }
        this.dentistCompleter.valueChanges
            .debounceTime(500)
            .subscribe(e => {
                if (e instanceof Object) {
                    this.addDentist(e);
                    this.dentistCompleter.setValue('');
                    this.filteredOptions = Observable.of();
                } else {
                    this.filteredOptions = this.dentistService.get(e);
                }
            }
            );
    }

    addDentist(dentist: IDentist) {
        if (this.clinicForm.controls.dentists.value.map(d => d.id).indexOf(dentist.id) === -1) {
            this.clinicForm.controls.dentists.setValue(this.clinicForm.controls.dentists.value.concat(dentist));
        }
    }

    removeDentist(dentist: IDentist) {
        this.clinicForm.controls.dentists.setValue(this.clinicForm.controls.dentists.value.filter((d) => {
            return d.id !== dentist.id;
        }));
    }

    displayDentist(dentist: IDentist) {
        return dentist ? dentist.first_name + ' ' + dentist.last_name : '';
    }

    onSubmit() {
        this.isSubmitting = true;
        this.clinicService.save(this.clinicForm.value)
            .finally(() => this.isSubmitting = false)
            .subscribe(
            _clinic => {
                this.snackBar.open('Salvo com sucesso.', '', { duration: 2000 });
                this.router.navigate(['clinicas']);
            },
            errors => {
                this.snackBar.open('Não foi possível salvar.', '', { duration: 2000 });
                this.clinicForm.pushFieldErrors(errors.error);
            });
    }

    onDelete() {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            height: '150px',
            data: {
                title: 'Você tem certeza disso ?',
                message: 'Ao apagar a Clinica, você também apagará todos os pacientes e agendamentos relacionados a ela. Deseja prosseguir?'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result === 'true') {
                this.isSubmitting = true;
                this.clinicService.remove(this.clinicForm.value).subscribe(
                    () => {
                        this.snackBar.open('Clinica excluida.', '', { duration: 2000 });
                        this.router.navigate(['clinicas']);
                    }
                );
            }
        });
    }

}
