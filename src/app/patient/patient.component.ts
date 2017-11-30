import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomFB, CustomFG } from '../shared/validation';
import { IMatcher, getMatchedField, getReversedMatchField } from '../shared/util';
import { IPatient, PatientFilter, PatientService } from './patient.service';
import { IClickEvent } from 'app/shared/components/pager/datatable-pager.component';

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
    urlFilters: IMatcher[] = [
        { prettyName: 'nome', name: 'fullName' },
        { prettyName: 'telefone', name: 'phone' },
    ]


    constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute) {
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

    view(selectedRow: IClickEvent<IPatient>) {
        if (selectedRow.type === 'click') {
            this.router.navigate(['/pacientes/' + selectedRow.row.id]);
        }
    }

    paginate(paginateEvent: { limit: number, offset: number }) {
        this.getPatients(paginateEvent.offset * paginateEvent.limit);
    }

    sort(sortEvent: { newValue: string, column: { prop: string } }) {
        this.sortBy = sortEvent.newValue === 'asc' ? sortEvent.column.prop : '-' + sortEvent.column.prop;
        this.getPatients(0)
    }

    filter() {
        const field = getReversedMatchField(this.filterForm.value.field, this.urlFilters);
        this.router.navigate(['/pacientes', field, this.filterForm.value.value])
    }

    setupUrlFilterListener() {
        this.route.params.subscribe(
            params => {
                this.patientFilter.reset()
                if (params.field !== undefined && params.value !== undefined) {
                    const field = getMatchedField(params.field, this.urlFilters);
                    this.patientFilter.setFilterValue(field, params.value);
                    this.filterForm.controls.field.setValue(field);
                    this.filterForm.controls.value.setValue(params.value);
                }
                this.getPatients(0);
            }
        )
    }
}
