import {Page, test, expect, Locator} from "@playwright/test";

export class BookingConfirmationPage {
    readonly page: Page;
    readonly confirmationText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmationText = page.getByText("Your order has been successfully processed!");        
    }

    async orderConfirmation() {
        await expect(this.confirmationText).toBeVisible();
    }


}