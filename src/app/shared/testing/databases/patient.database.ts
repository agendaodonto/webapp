import * as faker from 'faker/locale/pt_BR';

import { IPatient } from '../../../patient/patient.service';
import { BaseDatabase } from './base.database';
import { ClinicDatabase } from './clinic.database';
import { DentalPlanDatabase } from './dental-plan.database';

export class PatientDatabase extends BaseDatabase<IPatient> {

    clinicDatabase = new ClinicDatabase();
    dentalPlanDatabase = new DentalPlanDatabase();

    get(): IPatient {
        const patient: IPatient = {
            id: Math.floor((Math.random() * 100) + 1),
            name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            sex: 'M',
            phone: faker.phone.phoneNumber(),
            clinic: this.clinicDatabase.get(),
            dental_plan: this.dentalPlanDatabase.get(),
        };
        return patient;
    }

    getMany(qty: number): IPatient[] {
        return new Array(qty).fill(null).map(() => this.get());
    }
}
