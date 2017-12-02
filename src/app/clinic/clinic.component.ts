import { ClinicService, IClinic } from 'app/clinic/clinic.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ClinicFilter } from './clinic.service';
import { IPaginateEvent } from '../shared/components/pager/datatable-pager.component';
import { Router } from '@angular/router';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'app-clinic',
    templateUrl: './clinic.component.html',
    styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
    clinics: IClinic[] = [];
    isLoading = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: ClinicDataSource;
    displayedColumns = ['name', 'actions']

    constructor(private clinicService: ClinicService, private router: Router) {
    }

    ngOnInit() {
        // this.getClinics(0);
        this.dataSource = new ClinicDataSource(this.clinicService, this.paginator);
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
            });
    }
    view(clinic: IClinic) {
        this.router.navigate(['/clinicas/' + clinic.id]);
    }

    paginate(paginateEvent: IPaginateEvent) {
        this.getClinics(paginateEvent.offset * paginateEvent.limit);
    }

}


class ClinicDataSource extends DataSource<IClinic> {
    count = 0;
    isLoading = true;

    constructor(private clinicService: ClinicService, private paginator: MatPaginator) {
        super();
    }

    connect(_collectionViewer: CollectionViewer): Observable<IClinic[]> {
        const displayDataChages = [this.paginator.page];

        return Observable.merge(...displayDataChages)
            .startWith(null)
            .switchMap(() => {
                this.isLoading = true;
                const clinicFilter = new ClinicFilter();
                const offset = this.paginator.pageSize * this.paginator.pageIndex;
                clinicFilter.setFilterValue('pageSize', this.paginator.pageSize.toString());
                clinicFilter.setFilterValue('offset', offset.toString());
                return this.clinicService.getAll(clinicFilter).map(response => {
                    this.count = response.count;
                    return response.results;
                }).finally(() => this.isLoading = false);
            })
    }

    disconnect(_collectionViewer: CollectionViewer): void { }

}
