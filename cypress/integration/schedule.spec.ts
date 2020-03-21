import moment = require('moment');

import { Authentication } from '../support/authentication';
import { deleteUser } from '../support/data/builder';
import { Patients } from '../support/data/patients';
import { faker } from '../support/faker';
import { Select } from '../support/select';

describe('Schedule', () => {
    beforeEach(() => {
        Authentication.setAuth();

        cy.visit('/dashboard');
        cy.get('mat-sidenav').contains('Agenda').click();
    });

    after(() => {
        deleteUser();
    });

    it('should create a schedule', () => {
        cy.get('a[mat-raised-button]').contains('Novo').click();

        Patients.getPatients().then(response => {
            const scheduleRandomDate = faker.date.between(moment().hour(10).toDate(), moment().hour(22).toDate());
            const patientName = response.body.results[0].name;
            const scheduleDate = moment(scheduleRandomDate).format('YYYY-MM-DD[T]hh:mm');

            cy.get('input[formcontrolname="patient"]').type(patientName);
            cy.get('mat-option').contains(patientName).click();
            cy.get('input[formcontrolname="date"]').type(scheduleDate);

            cy.get('input[formcontrolname="duration"]').type('60');
            Select.random('mat-select[formcontrolname="dentist"]');

            cy.contains('Salvar').click();

            cy.get('mwl-calendar-week-view').should('contain.text', patientName);
        });
    });

    it('should list schedules', () => {
        cy.get('mwl-calendar-event-title').should('have.length.greaterThan', 0);
    });

    it('should delete an schedule', () => {
        cy.get('mwl-calendar-event-title').then(foundEvents => {
            const eventCount = Cypress.$(foundEvents).length;

            foundEvents.click();

            cy.contains('Apagar').click();
            cy.contains('Sim').click();

            cy.get('mwl-calendar-event-title').then(foundEventsAfterDeletion => {
                const eventCountAfterDeletion = Cypress.$(foundEventsAfterDeletion).length;

                expect(eventCountAfterDeletion).to.be.lessThan(eventCount);
            });
        });
    });

});
