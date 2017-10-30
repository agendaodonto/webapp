import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFB, CustomFG } from '../shared/validation';
import { IPatient, PatientFilter, PatientService } from './patient.service';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
    patients: IPatient[] = [];
    isLoading = true;
    patientCount = 0;
    sortBy = 'name';
    filterForm: CustomFG;
    patientFilter = new PatientFilter();
    pageLimit = 10;

    constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute, private location: Location) {
        const fb = new CustomFB()
        this.filterForm = fb.group({
            field: ['fullName'],
            value: ['']
        })
    }

    ngOnInit() {
        this.setupUrlFilterListener();
    }

    getPatients(offset: number) {
        this.isLoading = true;
        this.patientFilter.setFilterValue('offset', offset.toString());
        this.patientFilter.setFilterValue('orderBy', this.sortBy);

        this.patientService.getAll(this.patientFilter)
            .finally(() => this.isLoading = false)
            .subscribe(
            response => {
                this.patientCount = response.count;
                this.patients = response.results;
            });
    }

    view(patient: { row: IPatient }) {
        this.router.navigate(['/pacientes/' + patient.row.id]);
    }

    paginate(paginateEvent: { limit: number, offset: number }) {
        this.getPatients(paginateEvent.offset * paginateEvent.limit);
    }

    sort(sortEvent: { newValue: string, column: { prop: string } }) {
        this.sortBy = sortEvent.newValue === 'asc' ? sortEvent.column.prop : '-' + sortEvent.column.prop;
        this.getPatients(0)
    }

    filter() {
        const field = this.filterForm.value.field;
        const value = this.filterForm.value.value;
        this.router.navigate(['/pacientes/'], { queryParams: { valor: value, campo: field }, replaceUrl: true });
    }

    onFilter() {
        const field = this.filterForm.value.field
        const value = this.filterForm.value.value
        this.patientFilter.reset();
        this.patientFilter.setFilterValue(field, value);
        this.getPatients(0);
    }

    /**
     * Configures a queryParam listener
     * Every URL change will trigger a new onFilter event
     * @memberof PatientComponent
     */
    setupUrlFilterListener() {
        this.route.queryParams.subscribe((queryParams) => {
            const field = queryParams['campo']
            const value = queryParams['valor']
            if (field && value) {
                this.filterForm.controls.field.setValue(field);
                this.filterForm.controls.value.setValue(value);
            } else {
                this.filterForm.controls.field.setValue('fullName');
                this.filterForm.controls.value.setValue('');
                if (this.route.snapshot.routeConfig.path !== 'pacientes') {
                    this.location.go('pacientes');
                }
            }
            this.onFilter();
        })

    }

}
