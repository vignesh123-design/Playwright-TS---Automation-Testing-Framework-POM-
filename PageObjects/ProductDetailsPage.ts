import {Page, test, expect, Locator} from "@playwright/test";

export class ProdcutDetailsPage {
    readonly page: Page;
    readonly descriptionText: Locator;
    readonly buyNowBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.descriptionText = page.getByText("Description");
        this.buyNowBtn = page.getByRole("button", {name: 'Buy now'});
    }

    async productDetailsPageVerification() {
        await expect(this.descriptionText).toBeVisible();        
    }

    async buyNowProduct() {
        await this.buyNowBtn.click();
    }
}