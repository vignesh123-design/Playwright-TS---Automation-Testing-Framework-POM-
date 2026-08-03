import {Page, test, expect, Locator} from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly termsAndCondition: Locator;
    readonly agreeCheckBox: Locator;
    readonly continueBtn: Locator;
    readonly closeBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.termsAndCondition = page.getByText("Terms & Conditions");
        this.closeBtn = page.locator(".modal-content .modal-header .close");
        this.agreeCheckBox = page.locator("#input-agree");
        this.continueBtn = page.locator("#button-save");
    }

    async agreeAndProceedBooking() {
        // await this.termsAndCondition.click();
        // await this.closeBtn.click();
        await this.agreeCheckBox.check({ force: true });
        await this.continueBtn.click();

    }
}