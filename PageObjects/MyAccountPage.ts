import {Page, test, expect, Locator} from "@playwright/test";

export class MyAccountPage {

    readonly page: Page;
    readonly myAccountPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountPage = page.locator("a[href*='route=account/account'].list-group-item.active");

    }

    async myAccountPageConfirmation() {
        await expect(this.myAccountPage).toBeVisible();
    }
}