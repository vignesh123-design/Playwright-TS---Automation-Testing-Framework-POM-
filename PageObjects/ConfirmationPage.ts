import {Page, test, expect, Locator} from "@playwright/test";

export class ConfirmationPage {
    readonly page: Page;
    readonly confirmBtn: Locator;
    readonly confirmOrderText: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.confirmBtn = page.locator("#button-confirm");
        this.confirmOrderText = page.getByText("Confirm Order").first();
        
    }

    async confirmOrderTextVisible() {
        await expect(this.confirmOrderText).toBeVisible();
    }

    async confirmBooking() {
        await this.confirmBtn.click();
    }

}