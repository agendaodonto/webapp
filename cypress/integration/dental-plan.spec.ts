import { Authentication } from '../support/authentication';
import { deleteUser } from '../support/data/builder';
import { faker } from '../support/faker';

describe('Dental Plan', () => {

    beforeEach(() => {
        Authentication.setAuth();
        cy.visit('/dashboard');
        cy.get('mat-sidenav').contains('Planos').click();
    });

    after(() => {
        deleteUser();
    });

    it('should list dental plans', () => {
        cy.get('app-dental-plan tbody > tr')
            .invoke('text')
            .should('not.be.empty');
    });

    it('should create a dental plan', () => {
        cy.contains('Novo').click();

        const newPlan = faker.company.bsBuzz();
        cy.get('app-dental-plan-detail input[formcontrolname="name"]').type(newPlan);
        cy.contains('Salvar').click();

        cy.get('app-dental-plan tbody > tr')
            .invoke('text')
            .should('contain', newPlan);
    });

    it('should delete a dental plan', () => {
        cy.get('table tbody').find('tr').first().find('td').first().then(col => {
            const deletedPlan = col.text();

            col.click();

            cy.contains('Apagar').click();

            cy.contains('Sim').click();

            cy.get('app-dental-plan tbody > tr')
                .invoke('text')
                .should('not.contain', deletedPlan);
        });
    });

});
