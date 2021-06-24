import { expect, test } from '@playwright/test';
import faker from 'faker';
import moment from 'moment';
import { cleanupAuth, createUserWithData, setupAuth, TestUser } from '../utils/authentication';
import { getPatients } from '../utils/data/patient.data';
import { randomOption } from '../utils/select';


test.describe('Schedule', () => {
    let user: TestUser;

    test.beforeAll(async () => {
        user = await createUserWithData();
    });

    test.beforeEach(async ({ page }) => {
        await setupAuth(page, user);

        await page.click('mat-sidenav :text("Agenda")');
    });

    test.afterAll(async () => {
        await cleanupAuth(user.token, user.password);
    });

    test('should create a schedule', async ({ page }) => {
        await page.click('a[mat-raised-button] :text("Novo")');
        const patients = await getPatients(user.token);

        const scheduleRandomDate = faker.date.between(moment().hour(10).toDate(), moment().hour(22).toDate());
        const patientName = patients.results[0].name;
        const scheduleDate = moment(scheduleRandomDate).format('DD/MM/YYYYhh:mm');


        await page.type('input[formcontrolname="patient"]', patientName);
        await page.click(`mat-option :text("${patientName}")`);
        await page.type('input[formcontrolname="date"]', scheduleDate);
        await page.type('input[formcontrolname="duration"]', '60');
        await randomOption(page, 'mat-select[formcontrolname="dentist"]')
        await page.click('button :text("Salvar")');

        await page.waitForSelector('app-schedule');
        await page.waitForSelector('app-schedule mat-progress-bar', { state: 'detached' });

        const calendar = await page.textContent('mwl-calendar-week-view');

        expect(calendar).toContain(patientName)
    });

    test('should list schedules', async ({ page }) => {
        await page.waitForSelector('app-schedule mat-progress-bar', { state: 'detached' });

        const schedules = await page.$$('mwl-calendar-event-title');

        expect(schedules.length).toBeGreaterThan(0);
        for (const schedule of schedules) {
            expect(await schedule.textContent()).not.toBe('');
        }
    });

    test('should delete an schedule', async ({ page }) => {
        await page.waitForSelector('app-schedule mat-progress-bar', { state: 'detached' });

        const schedules = await page.$$('mwl-calendar-event-title');
        const scheduleCountBeforeDeletion = schedules.length;

        const deletedSchedule = faker.random.arrayElement(schedules);

        await deletedSchedule.click();

        await page.click('button :text("Apagar")');
        await page.click('app-confirm-dialog button :text("Sim")');

        await page.waitForSelector('app-schedule');
        await page.waitForSelector('app-schedule mat-progress-bar', { state: 'detached' });

        const schedulesAfterDeletion = await page.$$('mwl-calendar-event-title');

        expect(schedulesAfterDeletion.length).toBeLessThan(scheduleCountBeforeDeletion)
    });

});
