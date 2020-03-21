import { Authentication } from "../support/authentication";
import { createUser, deleteUser } from "../support/data/builder";

describe('Login', () => {
    it('should not authenticate with invalid credentials', () => {
        cy.visit('/login');

        cy.get('input[name="email"]').type('some-invalid-email@acme.ltd');
        cy.get('input[name="password"]').type('some password');
        cy.get('form').submit();

        cy.location().should((location) => {
            expect(location.pathname).equals('/login');
        });
        cy.get('mat-error').should('contain', 'Impossível fazer login com as credenciais fornecidas.');
    });

    it('should authenticate with valid credentials', () => {
        createUser(false, false).then(() => {
            const user = Authentication.user;
            cy.visit('/login');

            cy.get('input[name="email"]').type(user.email);
            cy.get('input[name="password"]').type(user.password);
            cy.get('form').submit();

            cy.location().should((location) => {
                expect(location.pathname).equals('/dashboard');
            });
            const name = `${user.name} ${user.lastName}`;
            cy.get('mat-sidenav').should('contain.text', name);

            deleteUser();
        });
    });
});
