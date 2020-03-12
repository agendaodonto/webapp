import { setAuth } from '../support/commands';

describe('Dashboard', () => {
    it('should display the dashboard', () => {
        setAuth();

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
    });
});
