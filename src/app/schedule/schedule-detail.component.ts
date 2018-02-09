import { BaseComponent } from '../shared/components/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomFB, CustomFG } from '../shared/validation';
import { FormGroupDirective, Validators } from '@angular/forms';
import { IPatient, PatientFilter, PatientService } from '../patient/patient.service';
import { addMinutes, format } from 'date-fns';
import { MatDialog, MatSlideToggle, MatSnackBar } from '@angular/material';

import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { IDentist } from '../shared/services/dentist.service';
import { Observable } from 'rxjs/Observable';
import { ScheduleService, ISchedule } from './schedule.service';
import { isString } from 'util';
import { PatientDetailComponent } from 'app/patient/patient-detail.component';

@Component({
    selector: 'app-schedule-detail',
    templateUrl: './schedule-detail.component.html',
    styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent extends BaseComponent implements OnInit {
    isLoading = false;
    isSubmitting = false;
    scheduleForm: CustomFG;
    dentists: IDentist[] = [];
    filteredPatients: Observable<{ results: IPatient[] }>;
    scheduleId: number;
    schedule: ISchedule;
    @ViewChild('continuousMode') continuousMode: MatSlideToggle;
    @ViewChild(FormGroupDirective) scheduleFormDirective: FormGroupDirective;

    constructor(private scheduleService: ScheduleService,
        private patientService: PatientService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute) {
        super();
        this.scheduleForm = new CustomFB().group({
            id: [''],
            patient: ['', Validators.required],
            dentist: ['', Validators.required],
            date: ['', Validators.required],
            duration: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.scheduleId = +this.route.snapshot.params['id'];
        if (this.scheduleId) {
            this.loadScheduleData(this.scheduleId);
        }
        const filter = new PatientFilter();
        this.scheduleForm.controls.patient.valueChanges
            .debounceTime(100)
            .subscribe((value) => {
                if (isString(value)) {
                    filter.setFilterValue('fullName', value);
                    this.filteredPatients = this.patientService.getAll(filter);
                } else {
                    if (value != null) {
                        this.dentists = value.clinic.dentists;
                        if (this.dentists.length === 1) {
                            this.scheduleForm.controls.dentist.setValue(this.dentists[0]);
                        }
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
        const scheduleDate = this.scheduleForm.controls.date.value;
        const scheduleDuration = this.scheduleForm.controls.duration.value;
        const nextScheduleDate = addMinutes(scheduleDate, scheduleDuration);
        this.isSubmitting = true;
        this.scheduleService.save(this.scheduleForm.value)
            .finally(() => this.isSubmitting = false)
            .subscribe(() => {
                if (this.continuousMode && this.continuousMode.checked) {
                    this.scheduleFormDirective.resetForm();
                    this.scheduleForm.controls.date.setValue(format(nextScheduleDate, 'YYYY-MM-DDTHH:mm'));
                } else {
                    this.router.navigate(['/agenda']);
                }
            });
    }

    loadScheduleData(scheduleId: number) {
        this.isLoading = true;
        this.scheduleService.get(scheduleId)
            .finally(() => this.isLoading = false)
            .subscribe(
            schedule => {
                this.schedule = schedule;
                this.dentists = schedule.patient.clinic.dentists;
                this.scheduleForm.setValue({
                    id: schedule.id,
                    patient: schedule.patient,
                    date: format(schedule.date, 'YYYY-MM-DDTHH:mm:ss.SSS'),
                    dentist: schedule.dentist,
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
                        this.router.navigate(['/agenda']);
                    }
                );
            }
        });
    }

    patientSelected() {
        this.filteredPatients = null;
    }

    patientDialog() {
        this.dialog.open(PatientDetailComponent,
            { data: { patientId: this.scheduleForm.controls.patient.value.id } }
        )
    }
}
