import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSlideToggle, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ClinicService, IClinic } from '../clinic/clinic.service';
import { DentalPlanService, IDentalPlan } from '../dental-plan/dental-plan.service';
import { ISchedule } from '../schedule/schedule.service';
import { BaseComponent } from '../shared/components/base.component';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { IPagedResponse } from '../shared/interceptors/responses';
import { CustomFB, CustomFG } from '../shared/validation';
import { PatientSchedulesDataSource } from './patient-schedules.datasource';
import { IPatient, PatientService } from './patient.service';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent extends BaseComponent implements OnInit {
    @ViewChild('continuousMode') continuousMode: MatSlideToggle;
    @ViewChild(FormGroupDirective) patientFormDirective: FormGroupDirective;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    patientForm: CustomFG;
    clinics: IClinic[];
    dentalPlans: IDentalPlan[];
    patientId: number;
    isLoading = true;
    isSubmitting = false;
    filteredPlans: Observable<IPagedResponse<IDentalPlan>>;
    datasource: PatientSchedulesDataSource;
    columnsToDisplay = ['scheduleDate'];

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private patientService: PatientService,
        private clinicService: ClinicService,
        private router: Router,
        private route: ActivatedRoute,
        private dentalPlanService: DentalPlanService,
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) {
        super();
        this.patientForm = new CustomFB().group({
            id: [''],
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            phone: ['', Validators.required],
            sex: ['', Validators.required],
            clinic: ['', Validators.required],
            dental_plan: ['', Validators.required],
        });
    }

    ngOnInit() {
        if (this.dialogData) {
            this.patientId = this.dialogData.patientId;
        } else {
            this.patientId = +this.route.snapshot.params['id'];
        }
        this.loadClinics();
        this.loadDentalPlans();

        if (this.patientId) {
            this.datasource = new PatientSchedulesDataSource(this.patientService, this.patientId, this.paginator);
            this.loadPatientSchedules();
        } else {
            this.isLoading = false;
        }
    }

    private loadClinics() {
        this.clinicService.getAll().subscribe((response) => this.clinics = response.results);
    }

    private loadDentalPlans() {
        this.dentalPlanService.getAll().subscribe(response => { this.dentalPlans = response.results; });
    }

    private loadPatientSchedules() {
        this.datasource.filterChanges.next(null);
        this.patientService.get(this.patientId).pipe(
            finalize(() => this.isLoading = false),
        ).subscribe((response) => {
            this.patientForm.setValue({
                id: response.id,
                name: response.name,
                last_name: response.last_name,
                phone: response.phone,
                sex: response.sex,
                clinic: response.clinic,
                dental_plan: response.dental_plan,
            });
        });
    }

    onSubmit() {
        this.isSubmitting = true;
        const data: IPatient = this.patientForm.value;
        this.patientService.save(data).pipe(
            finalize(() => this.isSubmitting = false),
        ).subscribe(
            (_patient) => {
                this.snackBar.open('Salvo com sucesso', '', { duration: 2000 });
                if (this.continuousMode && this.continuousMode.checked) {
                    this.patientFormDirective.resetForm();
                    this.patientForm.controls.id.setValue('');
                } else {
                    this.router.navigate(['/pacientes']);
                }
            },
            (errors) => {
                this.snackBar.open('Não foi possível salvar.', '', { duration: 2000 });
                this.patientForm.pushFieldErrors(errors.error);
            });
    }

    onDelete() {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            height: '150px',
            data: {
                title: 'Você tem certeza disso ?',
                message: 'Ao apagar o Paciente, você também apagará todos os seus agendamentos. Deseja prosseguir?',
            },
        });

        dialog.afterClosed().subscribe((result) => {
            if (result === 'true') {
                this.isSubmitting = true;
                this.patientService.remove(this.patientForm.value).subscribe(
                    () => {
                        this.snackBar.open('Paciente excluido.', '', { duration: 2000 });
                        this.router.navigate(['pacientes']);
                    },
                );
            }
        });
    }

    viewSchedule(schedule: ISchedule) {
        this.router.navigate(['agenda', schedule.id]);
    }

}
