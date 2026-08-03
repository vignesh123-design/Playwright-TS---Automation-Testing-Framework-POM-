import { test as setup, expect } from '@playwright/test';

import { LandingPage } from '../PageObjects/LandingPage';
import { LoginPage } from '../PageObjects/LoginPage';
import { MyAccountPage } from '../PageObjects/MyAccountPage'

const authFile = 'tests/.auth/user.json'; // Auth file

setup('Get the storage session', async ({ page }) => {
   // Landing page...
   const landingPage = new LandingPage(page);
   await landingPage.Login();   
   await landingPage.LoginPageNavigation();

   // Login page.
   const loginPage = new LoginPage(page);
   await loginPage.LoginPageConfirmation();
   await loginPage.LoginAction("martin.fistin@gmail.com", "Martin@123");

   // My account page -> Landing page.
   const myAccountPage = new MyAccountPage(page);
   await myAccountPage.myAccountPageConfirmation();

   // Save to stored session in authfile..
   await page.context().storageState({ path: authFile });


});