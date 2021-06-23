import { expect, test } from "@playwright/test";
import { createUserWithData, setupAuth } from "../utils/authentication";
import { createBaseData } from "../utils/data/base-data";
import { baseAppUrl } from "../utils/vars";

test.describe('Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${baseAppUrl}/login`);
    });

    test('should not authenticate with invalid credentials', async ({ page }) => {
        await page.type('input[name="email"]', 'some-invalid-email@acme.ltd');
        await page.type('input[name="password"]', 'some password');
        await page.click('app-login button');
        await page.waitForSelector('mat-spinner', { state: 'detached' });

        const error = await page.textContent('mat-error');

        expect(error).toBeDefined();
        expect(error?.trim()).toEqual('Impossível fazer login com as credenciais fornecidas.')
    });

    test('should authenticate with valid credentials', async ({ page }) => {
        const user = await createUserWithData();

        await page.type('input[name="email"]', user.email);
        await page.type('input[name="password"]', user.password);
        await page.click('app-login button');
        await page.waitForSelector('mat-spinner', { state: 'detached' });

        const username = await page.textContent('mat-sidenav .sidenav-header p')

        expect(page.url()).toContain('/dashboard');
        expect(username).not.toHaveLength(0)
    });
});