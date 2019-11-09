import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { DentalPlanDatasource } from '../dental-plan.datasource';
import { DentalPlanService, IDentalPlan } from '../dental-plan.service';

@Component({
  selector: 'app-dental-plan',
  templateUrl: './dental-plan.component.html',
  styleUrls: ['./dental-plan.component.scss'],
})
export class DentalPlanComponent implements OnInit, AfterViewInit {
  readonly columnsToDisplay = ['planName'];
  datasource: DentalPlanDatasource;

  @ViewChild(MatPaginator, { static: false })
  private paginator: MatPaginator;

  constructor(private dentalPlanService: DentalPlanService, private router: Router) { }

  ngOnInit() {
    this.datasource = new DentalPlanDatasource(this.dentalPlanService);
    this.datasource.update.next(null);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.datasource.filter.reset();
      this.datasource.filter.setFilterValue('pageSize', this.paginator.pageSize.toString());
      this.datasource.update.next(null);
    });
  }

  rowClicked(plan: IDentalPlan): void {
    this.router.navigate(['planos', plan.id]);
  }
}
