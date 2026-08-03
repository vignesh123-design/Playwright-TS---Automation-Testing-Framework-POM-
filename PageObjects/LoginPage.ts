import {Page, test, expect, Locator} from "@playwright/test";

export class LoginPage{
    readonly page: Page;
    readonly display: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginBtn : Locator;


    constructor(page: Page){
        this.page = page;
        this.display = page.locator("//li[@class='breadcrumb-item active' and contains(text(), 'Login')]");
        this.emailField = page.locator("#input-email");
        this.passwordField = page.locator("#input-password");
        this.loginBtn = page.locator("//input[@value='Login']");
        
    }

    async LoginPageConfirmation() {
        await expect(this.display).toBeVisible();
    }

    async LoginAction(userID: string, password: string) {
        await this.emailField.fill(userID);
        await this.passwordField.fill(password);
        await this.loginBtn.click();

    }


}
