import { ClinicService, IClinic } from 'app/clinic/clinic.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { ClinicFilter } from './clinic.service';
import { Router } from '@angular/router';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        this.dataSource = new ClinicDataSource(this.clinicService, this.paginator);
    }
    view(clinic: IClinic) {
        this.router.navigate(['/clinicas/' + clinic.id]);
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
