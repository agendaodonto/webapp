import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material';
import { merge, Observable, ReplaySubject, Subscribable } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

import { DentalPlanFilter } from './dental-plan.filter';
import { DentalPlanService, IDentalPlan } from './dental-plan.service';

export class DentalPlanDatasource extends DataSource<IDentalPlan> {

    count = 0;
    update = new ReplaySubject<null>();
    isLoading = true;
    private events: Array<Subscribable<null>> = [this.update];
    private filter = new DentalPlanFilter();

    constructor(private dentalPlanService: DentalPlanService, private paginator?: MatPaginator) {
        super();
    }

    connect(): Observable<IDentalPlan[]> {
        if (this.paginator) {
            this.events.push(this.paginator.page);
        }

        return merge(...this.events).pipe(
            switchMap(() => {
                this.filter.reset();
                if (this.paginator) {
                    this.filter.setFilterValue('pageSize', this.paginator.pageSize.toString());
                }
                this.isLoading = true;
                return this.dentalPlanService.getAll(this.filter).pipe(
                    finalize(() => this.isLoading = false),
                    map(response => {
                        this.count = response.count;
                        return response.results;
                    }),
                );
            }),
        );
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

}