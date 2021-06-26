import { expect, test } from "@playwright/test";
import faker from "faker";
import { cleanupAuth, createUserWithData, setupAuth, TestUser } from "../utils/authentication";

test.describe('Dental Plan', () => {
    let user: TestUser;
    test.beforeAll(async () => {
        user = await createUserWithData();
    });

    test.beforeEach(async ({ page }) => {
        await setupAuth(page, user)

        await page.click('mat-sidenav :text("Planos")')
    });

    test.afterAll(async () => {
        await cleanupAuth(user.token, user.password);
    })

    test('should list dental plans', async ({ page }) => {
        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const rows = await page.$$('app-dental-plan tbody tr')
        expect(rows.length).toBeGreaterThan(0);

        for (const row of rows) {
            expect(await row.textContent()).not.toBe('');
        }
    });

    test('should create a dental plan', async ({ page }) => {
        // Current logic doesnt separate dental plans between users
        test.fixme();
        await page.click('a :text("Novo")');

        const newPlan = faker.company.bsBuzz();
        await page.type('app-dental-plan-detail input[formcontrolname="name"]', newPlan);
        await page.click('button :text("Salvar")')

        await page.waitForNavigation()
        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        await page.waitForSelector('mat-spinner', { state: 'detached' });

        const table = await page.textContent('app-dental-plan table')

        expect(table).toContain(newPlan)
    });

    test('should delete a dental plan', async ({ page }) => {
        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const firstRow = await page.$('app-dental-plan table tbody > tr')
        const firstCol = await firstRow?.$('td')
        const deletedClinicName = await firstCol?.textContent();

        await firstCol?.click();

        await page.click('button :text("Apagar")');
        await page.click('app-confirm-dialog button :text("Sim")');
        
        await page.waitForNavigation()
        await page.waitForSelector('mat-progress-bar', { state: 'detached' });

        const table = await page.textContent('app-dental-plan table');

        expect(table).not.toContain(deletedClinicName);
    });

});
