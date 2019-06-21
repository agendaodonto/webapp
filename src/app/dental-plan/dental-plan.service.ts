import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagedResponse } from '../shared/interceptors/responses';
import { BaseService } from '../shared/services/base.service';
import { DentalPlanFilter } from './dental-plan.filter';

@Injectable()
export class DentalPlanService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    getAll(dentalPlanFilter?: DentalPlanFilter): Observable<IPagedResponse<IDentalPlan>> {
        const filter = dentalPlanFilter ? dentalPlanFilter : new DentalPlanFilter();
        return this.http.get<IPagedResponse<IDentalPlan>>(this.url(['dental-plans']), filter.getFilter());
    }

    create(plan: IDentalPlan) {
        return this.http.post<IDentalPlan>(this.url(['dental-plans']), plan);
    }

    update(plan: IDentalPlan) {
        if (!plan.id) {
            throw new Error('ID is required for updating a plan');
        }
        return this.http.put<IDentalPlan>(this.url(['dental-plans', plan.id]), plan);
    }

    save(plan: IDentalPlan) {
        if (plan.id) {
            return this.update(plan);
        } else {
            return this.create(plan);
        }
    }
}

export interface IDentalPlan {
    id?: number;
    name: string;
}
