import moment = require('moment');

import { Authentication } from '../authentication';
import { faker } from '../faker';

const baseUrl = Cypress.env('service');

export function createUser(withData = true, authenticate = true) {
    const url = `${baseUrl}/auth/users/`;
    const body = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        cro: faker.random.number().toString(),
        cro_state: 'SP',
        sex: 'M',
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    return cy.request({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
        url,
    }).then(response => {
        const userId = response.body.id;
        const payload = {
            email: body.email,
            password: body.password,
        };

        cy.request({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
            url: `${baseUrl}/auth/token/login/`,
        }).then(loginResponse => {
            const token: string = loginResponse.body.auth_token;
            cy.request({
                method: 'GET',
                url: `${baseUrl}/auth/users/me/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            }).then(userData => {
                Authentication.user = { name: body.first_name, lastName: body.last_name, token, ...payload };
                if (authenticate) {
                    console.log('settings data', authenticate, withData)
                    Authentication.setUserInfo(userData.body);
                    Authentication.setToken(token);
                }
            });

            if (withData) {
                createClinics(token, userId);
            }
        });
    });
}

function createClinics(token: string, userId: number) {
    return new Array(2).fill(null).map(() => {
        return {
            name: faker.company.companyName(),
            dentists: [userId],
        };
    }).map(clinic => {
        cy.request({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: clinic,
            url: `${baseUrl}/v1/clinics/`,
        }).then(clinicResponse => {
            return createDentalPlans(token, clinicResponse.body.id, userId);
        });
    });
}

function createDentalPlans(token: string, clinicId: number, userId: number) {
    new Array(1).fill(null).map(() => {
        return {
            name: faker.company.companyName(),
        };
    }).forEach(dentalPlan => {
        cy.request({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: dentalPlan,
            url: `${baseUrl}/v1/dental-plans/`,
        }).then(dentalPlanResponse => {
            createPatients(token, clinicId, dentalPlanResponse.body.id, userId);
        });
    });
}

function createPatients(token: string, clinicId: number, dentalPlanId: number, userId: number) {
    new Array(2).fill(null).map(() => {
        return {
            name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            sex: faker.random.arrayElement(['M', 'F']),
            phone: faker.phone.phoneNumber('############'),
            clinic: clinicId,
            dental_plan: dentalPlanId,
        };
    }).forEach(patient => {
        cy.request({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: patient,
            url: `${baseUrl}/v1/patients/`,
        }).then(patientResponse => {
            createSchedules(token, userId, patientResponse.body.id);
        });
    });
}

function createSchedules(token: string, userId: number, patientId: number) {
    new Array(5).fill(null).map(() => {
        const scheduleDate = faker.date.between(moment().hour(8).toDate(), moment().hour(20).toDate());
        return {
            patient: patientId,
            dentist: userId,
            date: moment(scheduleDate).format('YYYY-MM-DD[T]hh:mm'),
            duration: faker.random.number({ min: 15, max: 120 }),
        };
    }).forEach(schedule => {
        cy.request({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: schedule,
            url: `${baseUrl}/v1/schedules/`,
        });
    });
}

export function deleteUser() {
    const url = `${baseUrl}/auth/users/me/`;
    const body = {
        current_password: Authentication.user.password,
    };

    cy.request({
        method: 'DELETE',
        url,
        body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${Authentication.user.token}`,
        },
    });
};