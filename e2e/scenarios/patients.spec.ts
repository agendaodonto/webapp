import { expect, test } from "@playwright/test";
import faker from "faker";
import { cleanupAuth, createUserWithData, setupAuth, TestUser } from "../utils/authentication";
import { getPatients } from "../utils/data/patient.data";
import { randomOption, selectByName } from "../utils/select";

test.describe('Patients', () => {
    let user: TestUser;

    test.beforeAll(async () => {
        user = await createUserWithData();
    });

    test.beforeEach(async ({ page }) => {
        setupAuth(page, user);

        await page.click('mat-sidenav :text("Pacientes")')
    });

    test.afterAll(async () => {
        await cleanupAuth(user.token, user.password);
    });

    test('should create a patient', async ({ page }) => {
        await page.click('a :text("Novo")')

        const name = faker.name.firstName();
        const lastName = faker.name.lastName();


        await page.type('input[formcontrolname="name"]', name);
        await page.type('input[formcontrolname="last_name"]', lastName);
        await page.type('input[formcontrolname="phone"]', faker.phone.phoneNumber('##-#####-####'));
        await randomOption(page, 'mat-select[formcontrolname="sex"]');
        await randomOption(page, 'mat-select[formcontrolname="dental_plan"]');
        await randomOption(page, 'mat-select[formcontrolname="clinic"]');

        await page.click('button :text("Salvar")');

        await page.waitForSelector('app-patient')

        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const table = await page.textContent('app-patient table')

        expect(table).toContain(name);
        expect(table).toContain(lastName);
    });

    test('should list patients', async ({ page }) => {
        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const rows = await page.$$('app-patient table tbody tr')

        for (const row of rows) {
            expect(await row.textContent()).not.toEqual('');
        }
    });

    test('should find a patient by name', async ({ page }) => {
        const patients = await getPatients(user.token);
        const lookupPatient = faker.random.arrayElement(patients.results);

        await page.type('input[formcontrolname="value"]', `${lookupPatient.name} ${lookupPatient.last_name}`);
        await page.press('input[formcontrolname="value"]', 'Enter');

        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const table = await page.textContent('app-patient table');

        expect(table).toContain(lookupPatient.name);
    });

    test('should find a patient by phone', async ({ page }) => {
        const patients = await getPatients(user.token);
        const lookupPatient = faker.random.arrayElement(patients.results);

        await selectByName(page, 'mat-select[formcontrolname="field"]', 'Telefone');
        await page.type('input[formcontrolname="value"]', lookupPatient.phone);
        await page.press('input[formcontrolname="value"]', 'Enter');
        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const table = await page.textContent('app-patient table');
        expect(table).toContain(lookupPatient.name);
    });

    test('should delete a patient', async ({ page }) => {
        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const firstRow = await page.$('app-patient table tbody > tr');
        const deletedPatient = await (await firstRow?.$('td'))?.textContent()

        await firstRow?.click();

        await page.click('button :text("Apagar")');
        await page.click('app-confirm-dialog button :text("Sim")');

        await page.waitForSelector('app-patient');
        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const table = await page.textContent('app-patient table');

        expect(table).not.toContain(deletedPatient);
    });
});
