import { BaseComponent } from '../shared/components/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService, IClinic } from 'app/clinic/clinic.service';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { CustomFB, CustomFG } from '../shared/validation';
import { FormGroupDirective, Validators } from '@angular/forms';
import { IClickEvent, IPaginateEvent } from '../shared/components/pager/datatable-pager.component';
import { IPatient, PatientService } from 'app/patient/patient.service';
import { ISchedule, ScheduleFilter } from '../schedule/schedule.service';
import { MatDialog, MatSlideToggle, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent extends BaseComponent implements OnInit {
    patientForm: CustomFG;
    clinics: IClinic[];
    patientId: number;
    schedulesLoading = false;
    schedules: ISchedule[] = [];
    scheduleCount = 0;
    pageSize = 10;
    isLoading = true;
    isSubmitting = false;
    @ViewChild('continuousMode') continuousMode: MatSlideToggle;
    @ViewChild(FormGroupDirective) patientFormDirective: FormGroupDirective;

    constructor(private patientService: PatientService,
        private clinicService: ClinicService,
        private router: Router,
        private route: ActivatedRoute,
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
        super();
        this.patientForm = new CustomFB().group({
            id: [''],
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            phone: ['', Validators.required],
            sex: ['', Validators.required],
            clinic: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (this.dialogData) {
            this.patientId = this.dialogData.patientId;
        } else {
            this.patientId = +this.route.snapshot.params['id'];
        }
        this.loadClinics();
        if (this.patientId) {
            this.getSchedules(0);
            this.patientService.get(this.patientId)
                .finally(() => this.isLoading = false)
                .subscribe(response => {
                    this.patientForm.setValue({
                        id: response.id,
                        name: response.name,
                        last_name: response.last_name,
                        phone: response.phone,
                        sex: response.sex,
                        clinic: response.clinic,
                    });
                });
        } else {
            this.isLoading = false;
        }
    }

    loadClinics() {
        this.clinicService.getAll().subscribe(response => this.clinics = response.results);
    }

    getSchedules(offset: number) {
        this.schedulesLoading = true;
        const filter = new ScheduleFilter()
        filter.setFilterValue('orderBy', '-date');
        filter.setFilterValue('offset', offset.toString());
        this.patientService.getSchedules(this.patientId, filter)
            .finally(() => this.schedulesLoading = false)
            .subscribe(response => {
                this.scheduleCount = response.count;
                this.schedules = response.results;
            });
    }

    onSubmit() {
        this.isSubmitting = true;
        const data: IPatient = this.patientForm.value;
        this.patientService.save(data)
            .finally(() => this.isSubmitting = false)
            .subscribe(
            _patient => {
                this.snackBar.open('Salvo com sucesso', '', { duration: 2000 });
                if (this.continuousMode && this.continuousMode.checked) {
                    this.patientFormDirective.resetForm();
                } else {
                    this.router.navigate(['/pacientes']);
                }
            },
            errors => {
                this.snackBar.open('Não foi possível salvar.', '', { duration: 2000 });
                this.patientForm.pushFieldErrors(errors.json());
            });
    }

    onDelete() {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            height: '150px',
            data: {
                title: 'Você tem certeza disso ?',
                message: 'Ao apagar o Paciente, você também apagará todos os seus agendamentos. Deseja prosseguir?'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result === 'true') {
                this.isSubmitting = true;
                this.patientService.remove(this.patientForm.value).subscribe(
                    () => {
                        this.snackBar.open('Paciente excluido.', '', { duration: 2000 });
                        this.router.navigate(['pacientes']);
                    }
                );
            }
        });
    }

    paginateSchedules(event: IPaginateEvent) {
        this.getSchedules(event.limit * event.offset);
    }

    viewSchedule(selectedRow: IClickEvent<ISchedule>) {
        if (selectedRow.type === 'click') {
            this.router.navigate(['agenda', selectedRow.row.id]);
        }
    }

}
