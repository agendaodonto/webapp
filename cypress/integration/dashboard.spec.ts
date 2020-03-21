import { Authentication } from '../support/authentication';
import { deleteUser } from '../support/data/builder';


describe('Dashboard', () => {

    it('should display the dashboard', () => {
        Authentication.setAuth();

        cy.visit('/dashboard');

        cy.get('mat-card')
            .contains('Consultas a confirmar')
            .parent()
            .find('p')
            .invoke('text')
            .should('match', /[0-9]+/);

        cy.get('mat-card')
            .contains('Taxa de comparecimento')
            .parent()
            .find('p')
            .invoke('text')
            .should('match', /[0-9]+%/);

        cy.get('mat-card')
            .contains('Consultas a confirmar')
            .parent()
            .find('p')
            .invoke('text')
            .should('match', /[0-9]+/);

        deleteUser();
    });
});
