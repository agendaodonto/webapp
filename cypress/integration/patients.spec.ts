import { Authentication } from '../support/authentication';
import { deleteUser } from '../support/data/builder';
import { Patients } from '../support/data/patients';
import { faker } from '../support/faker';
import { Select } from '../support/select';

describe('Patients', () => {
    beforeEach(() => {
        Authentication.setAuth();

        cy.visit('/dashboard');
        cy.get('mat-sidenav').contains('Pacientes').click();
    });

    after(() => {
        deleteUser();
    });

    it('should create a patient', () => {
        cy.contains('Novo').click();

        const name = faker.name.firstName();

        cy.get('input[formcontrolname="name"]').type(name);
        cy.get('input[formcontrolname="last_name"]').type(faker.name.lastName());
        cy.get('input[formcontrolname="phone"]').type(faker.phone.phoneNumber('##-#####-####'));
        Select.random('mat-select[formcontrolname="sex"]');
        Select.random('mat-select[formcontrolname="dental_plan"]');
        Select.random('mat-select[formcontrolname="clinic"]');

        cy.contains('Salvar').click();

        cy.get('input[formcontrolname="value"]').type(name);

        cy.get('app-patient table tbody')
            .should('have.length', 1)
            .invoke('text')
            .should('contain', name);
    });

    it('should list patients', () => {
        cy.get('app-patient table tbody > tr td')
            .each((col) => {
                expect(col.text()).not.to.equal('');
            });
    });

    it('should find a patient by name', () => {
        Patients.getPatients().then(response => {
            const patient: { phone: string, name: string, last_name: string } = faker.random.arrayElement(response.body.results);

            cy.get('input[formcontrolname="value"]').type(`${patient.name} ${patient.last_name}`).type('{enter}');

            cy.get('app-patient table tbody')
                .should('have.length', 1)
                .invoke('text')
                .should('contain', patient.name);
        });
    });

    it('should find a patient by phone', () => {
        Patients.getPatients().then(response => {
            const patient: { phone: string, name: string } = faker.random.arrayElement(response.body.results);

            Select.select('mat-select[formcontrolname="field"]', 'Telefone');
            cy.get('input[formcontrolname="value"]').type(patient.phone).type('{enter}');

            cy.get('app-patient table tbody')
                .should('have.length', 1)
                .invoke('text')
                .should('contain', patient.name);
        });
    });

    it('should delete a patient', () => {
        cy.get('app-patient table tbody > tr td').then(col => {
            const deletedPatient = col.text();

            col.click();

            cy.contains('Apagar').click();

            cy.contains('Sim').click();

            cy.get('app-patient table tbody')
                .should('have.length', 1)
                .invoke('text')
                .should('not.contain', deletedPatient);
        });
    });
});
