import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomFB, CustomFG } from '../shared/validation';
import { IPatient, PatientFilter, PatientService } from '../patient/patient.service';
import { MdDialog, MdSnackBar } from '@angular/material';

import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { IDentist } from '../shared/services/dentist.service';
import { Observable } from 'rxjs/Observable';
import { ScheduleService } from './schedule.service';
import { Validators } from '@angular/forms';
import { format } from 'date-fns';
import { isString } from 'util';

@Component({
    selector: 'app-schedule-detail',
    templateUrl: './schedule-detail.component.html',
    styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit {
    isLoading = false;
    isSubmitting = false;
    scheduleForm: CustomFG;
    dentists: IDentist[] = [];
    filteredPatients: Observable<{ results: IPatient[] }>;

    constructor(private scheduleService: ScheduleService,
        private patientService: PatientService,
        private snackBar: MdSnackBar,
        public dialog: MdDialog,
        private router: Router,
        private route: ActivatedRoute) {
        this.scheduleForm = new CustomFB().group({
            id: [''],
            patient: ['', Validators.required],
            dentist: ['', Validators.required],
            date: ['', Validators.required],
            duration: ['', Validators.required],
        });
    }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        if (id) {
            this.loadScheduleData(id);
        }
        const filter = new PatientFilter();
        this.scheduleForm.controls.patient.valueChanges
            .debounceTime(100)
            .subscribe((val) => {
                if (isString(val)) {
                    filter.setFilterValue('fullName', val);
                    this.filteredPatients = this.patientService.getAll(filter);
                } else {
                    this.dentists = val.clinic.dentists;
                    if (this.dentists.length === 1) {
                        this.scheduleForm.controls.dentist.setValue(this.dentists[0]);
                    }
                }

            });
    }

    displayPatient(patient: IPatient) {
        if (patient) {
            return patient.name + ' ' + patient.last_name;
        } else {
            return '';
        }
    }

    onSubmit() {
        this.isSubmitting = true;
        this.scheduleService.save(this.scheduleForm.value)
            .finally(() => this.isSubmitting = false)
            .subscribe(() => {
                this.router.navigate(['/agenda/semana']);
            });
    }

    loadScheduleData(scheduleId: number) {
        this.scheduleService.get(scheduleId).subscribe(
            schedule => {
                this.dentists = schedule.patient.clinic.dentists;
                this.scheduleForm.setValue({
                    id: schedule.id,
                    patient: schedule.patient,
                    date: format(schedule.date, 'YYYY-MM-DDTHH:mm:ss.SSS'),
                    /**
                     * TODO: Remove this when Material implements compareWith method for md-select
                     * https://github.com/angular/material2/issues/2785
                     */
                    dentist: this.dentists.find(d => d.id === schedule.dentist.id),
                    duration: schedule.duration
                });
            }
        );
    }

    onDelete() {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            height: '150px',
            width: '300px',
            data: {
                title: 'Você tem certeza disso ?',
                message: 'Deseja prosseguir?'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result === 'true') {
                this.isSubmitting = true;
                this.scheduleService.remove(this.scheduleForm.value).subscribe(
                    () => {
                        this.snackBar.open('Agendamento excluido.', '', { duration: 2000 });
                        this.router.navigate(['/agenda/semana']);
                    }
                );
            }
        });
    }
}
