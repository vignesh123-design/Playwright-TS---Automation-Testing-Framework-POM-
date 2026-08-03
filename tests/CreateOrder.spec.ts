import { test, expect } from '@playwright/test';

import { Home1Page } from '../PageObjects/Home1Page';
import { SearchResultPage } from '../PageObjects/SearchResultPage';
import { ProdcutDetailsPage } from '../PageObjects/ProductDetailsPage';
import { CheckoutPage } from '../PageObjects/CheckoutPage';
import { ConfirmationPage } from '../PageObjects/ConfirmationPage';
import { BookingConfirmationPage } from '../PageObjects/BookingConfirmationPage';

// Using the stored login session.
const authFile = 'tests/.auth/user.json'; // Auth file
test.use({storageState: authFile});

test('Create Order Flow', async ({ page }) => {

    const homePage = new Home1Page(page);
    await homePage.homePageLanding();
    await homePage.searchProduct("htc");

    const searchResultPage = new SearchResultPage(page);
    await searchResultPage.searchResultPageVerification("htc");
    const productActiveDetails = await searchResultPage.checkStockAvailability();
    await searchResultPage.selectStock(productActiveDetails!);

    const productDetailsPage = new ProdcutDetailsPage(page);
    // await productDetailsPage.productDetailsPageVerification();
    await productDetailsPage.buyNowProduct();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.agreeAndProceedBooking();

    const confirmationPage = new ConfirmationPage(page);
    await confirmationPage.confirmOrderTextVisible();
    await confirmationPage.confirmBooking();

    const bookingConfirmationPage = new BookingConfirmationPage(page);
    await bookingConfirmationPage.orderConfirmation();

    
});