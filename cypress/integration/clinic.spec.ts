import * as faker from 'faker';
import { setAuth } from '../support/commands';

describe('Clinic', () => {
    beforeEach(() => {
        setAuth();

        cy.visit('/dashboard');
        cy.get('mat-sidenav').contains('Clinicas').click();
    });

    it('should list clinics', () => {
        cy.get('table')
            .find('tbody > tr')
            .each(row => {
                expect(row.text()).not.be.equal('');
            });
    });

    it('should create clinic', () => {
        cy.get('a').contains('Novo').click();

        const newClinicName = faker.name.jobTitle();

        cy.get('input[formcontrolname="name"]').type(newClinicName);
        cy.get('button').contains('Salvar').click();

        cy.get('app-clinic table')
            .contains(newClinicName);
    });

    it('should delete clinic', () => {
        cy.get('table tbody').find('tr').first().find('td').then(cols => {
            const clinic = cols.first().text();

            cols.last().find('mat-icon').click();

            cy.contains('Apagar').click();

            cy.contains('Sim').click();

            cy.get('app-clinic table > tbody tr')
                .invoke('text')
                .should('not.be.empty')
                .should('not.contain', clinic);
        });
    });

});
