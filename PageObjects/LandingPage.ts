import {Page, test, expect, Locator} from "@playwright/test";

export class LandingPage{
   readonly page: Page;
   readonly Logo: Locator;
   readonly Myaccount: Locator;
   readonly LoginSelect: Locator;

   constructor(page: Page){
        this.page = page;
        this.Logo = page.locator("//a[@title='Poco Electro']");
        this.Myaccount = page.locator("(//*[@class='info']/*[contains(text(),'My account')])[2]");
        this.LoginSelect = page.locator(".dropdown-menu.show");
    }

    async Login(){
        await this.page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
        await this.Logo.waitFor();
    }

    async LoginPageNavigation() {
        await this.Myaccount.hover();
        await expect(this.LoginSelect).toBeVisible();
        await this.page.getByText("Login").click();
    }


}