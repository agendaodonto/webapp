import * as faker from 'faker/locale/pt_BR';

import { IDentalPlan } from '../../../dental-plan/dental-plan.service';
import { BaseDatabase } from './base.database';

export class DentalPlanDatabase extends BaseDatabase<IDentalPlan> {

    get(): IDentalPlan {
        const plan: IDentalPlan = {
            id: Math.floor((Math.random() * 100) + 1),
            name: faker.name.firstName(),
        };
        return plan;
    }

    getMany(qty: number): IDentalPlan[] {
        return new Array(qty).fill(null).map(() => this.get());
    }
}
