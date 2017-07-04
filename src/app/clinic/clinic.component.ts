import { ClinicService, IClinic } from 'app/clinic/clinic.service';
import { Component, OnInit } from '@angular/core';

import { ClinicFilter } from './clinic.service';
import { IPaginateEvent } from '../shared/components/pager/datatable-pager.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-clinic',
    templateUrl: './clinic.component.html',
    styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
    clinics: IClinic[];
    isLoading = false;
    pageLimit = 10;
    clinicCount = 0;

    constructor(private clinicService: ClinicService, private router: Router) {
    }

    ngOnInit() {
        this.getClinics(0);
    }
    getClinics(page: number) {
        this.isLoading = true;
        const filter = new ClinicFilter();
        filter.setFilterValue('offset', page.toString());
        this.clinicService.getAll(filter)
            .finally(() => this.isLoading = false)
            .subscribe(
            response => {
                this.clinics = response.results;
                this.clinicCount = response.count;
            });
    }
    view(clinic: { selected: Array<IClinic> }) {
        this.router.navigate(['/clinicas/' + clinic.selected[0].id]);
    }

    paginate(paginateEvent: IPaginateEvent) {
        this.getClinics(paginateEvent.offset * paginateEvent.limit);
    }

}
