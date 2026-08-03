import {Page, test, expect, Locator} from "@playwright/test";

export class SearchResultPage {

    readonly page: Page;
    readonly searchPageTitle: Locator;
    readonly productsResult: Locator;
    readonly productImage: Locator;
    readonly productActionBar: Locator;
    readonly quickView: Locator;
    readonly prodcutDetailsPopup: Locator;
    readonly productAvailability: Locator;
    readonly productDetailsPopupClose: Locator;
    readonly productImageSelection: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.searchPageTitle = page.locator("//div[@class='entry-content content-title ']/h1");
        this.productsResult = page.locator(".product-layout.product-grid");
        this.productImage = page.locator(".carousel-item.active"); // hover action 
        this.productActionBar = page.locator(".product-action");  //product action bar.
        this.quickView = page.locator("[title='Quick view']");
        this.prodcutDetailsPopup = page.locator("#product-quick-view");
        this.productAvailability = page.locator("//li[span[contains(text(),\"Availability:\")]]/span[contains(@class,\"badge\")]");  
        this.productDetailsPopupClose = page.locator(".close.btn.mz-modal-close");  
        this.productImageSelection = page.locator(".product-thumb-top");  


    }

    async searchResultPageVerification(productName: string) {
        await expect(this.searchPageTitle).toContainText(productName);
    }

    async checkStockAvailability() {
        const products: Locator[] = await this.productsResult.all(); // get all the products.
        for(let i=0; i<products.length; i++) {
            await products[i].hover(); 
            await expect(products[i].locator(this.productActionBar)).toBeVisible();
            await products[i].locator(this.quickView).click();
            await expect(this.prodcutDetailsPopup).toBeVisible();
            const productAvailabilityStatus = await this.prodcutDetailsPopup.locator(this.productAvailability).textContent();
            if(productAvailabilityStatus?.includes("Out")) {
                continue;
            } else {
                await this.productDetailsPopupClose.click();
                return i;
            }
        }    
    }

    async selectStock(stockItem: number) {
        await this.productsResult.nth(stockItem).locator(this.productImageSelection).click();
    }


}