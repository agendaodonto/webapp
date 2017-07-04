import { Component, OnInit } from '@angular/core';
import { IPatient, PatientFilter, PatientService } from './patient.service';

import { Router } from '@angular/router';

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
    patientFilter = new PatientFilter();
    pageLimit = 10;

    constructor(private patientService: PatientService, private router: Router) {
    }

    ngOnInit() {
        this.getPatients(0)
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

    filter(field: string, value: string){
        this.patientFilter.setFilterValue(field, value);
        this.getPatients(0);
    }

}
