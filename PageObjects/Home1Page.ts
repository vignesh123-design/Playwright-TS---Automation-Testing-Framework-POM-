import {Page, test, expect, Locator} from "@playwright/test";

export class Home1Page {

    readonly page: Page;
    readonly searchField: Locator;
    readonly searchBarSearchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchField = page.getByPlaceholder("Search For Products").first();
        this.searchBarSearchButton = page.locator("button.type-text");

    }

    async homePageLanding() {
        await this.page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
    }

    async searchProduct(productName: string) {
        await this.searchField.fill(productName);
        await this.searchBarSearchButton.click();
    }

    

}