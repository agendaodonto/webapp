import * as faker from 'faker';
import { IPatientResponse } from '../../../src/app/shared/interfaces/services/patient.model';
import { makeRequest } from '../request';
import { baseBackendUrl } from '../vars';


export function createPatients(token: string, clinicId: number, dentalPlanId: number, count = 2): Promise<IPatientResponse[]> {
    const jobs = new Array(count).fill(null).map(() => {
        return {
            name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            sex: faker.random.arrayElement(['M', 'F']),
            phone: faker.phone.phoneNumber('############'),
            clinic: clinicId,
            dental_plan: dentalPlanId,
        };
    }).map(patient => {
        return makeRequest(`${baseBackendUrl}/v1/patients/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(patient),
        }) as Promise<IPatientResponse>;
    });

    return Promise.all(jobs);
}