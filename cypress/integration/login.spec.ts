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
        cy.visit('/login');
        const user = Cypress.env('user');

        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('form').submit();

        cy.location().should((location) => {
            expect(location.pathname).equals('/dashboard');
        });
    });
});
