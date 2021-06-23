import { test, expect } from "@playwright/test";
import { cleanupAuth, createUserWithData, setupAuth, TestUser } from "../utils/authentication";

test.describe('Dashboard', () => {
    let user: TestUser;

    test.beforeAll(async () => {
        user = await createUserWithData()
    });

    test.beforeEach(async ({ page }) => {
        await setupAuth(page, user)
    });

    test.afterAll(async () => {
        await cleanupAuth(user.token, user.password);
    });

    test('should load the dashboard', async ({ page }) => {
        await page.waitForSelector('app-loading-overlay', { state: 'detached' });
        const pendingSchedules = await page.$('*css=mat-card >> text="Consultas a confirmar"').then(e => e?.$('p'));
        const attendanceRate = await page.$('*css=mat-card >> text="Taxa de comparecimento"').then(e => e?.$('p'));
        const patients = await page.$('*css=mat-card >> text="Pacientes"').then(e => e?.$('p'));

        expect(await pendingSchedules?.textContent()).toMatch(/[0-9]+/)
        expect(await attendanceRate?.textContent()).toMatch(/[0-9]+%/)
        expect(await patients?.textContent()).toMatch(/[0-9]+/)
    });
});