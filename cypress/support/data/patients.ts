import { Authentication } from '../authentication';

export class Patients {
    static getPatients() {
        const baseUrl = Cypress.env('service');

        return cy.request({
            method: 'GET',
            url: `${baseUrl}/v1/patients/`,
            headers: {
                Authorization: `Token ${Authentication.cachedToken}`,
            },
        });
    }
}
