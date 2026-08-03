# Playwright + TypeScript Automation Framework (POM)

A Playwright automation framework built with **TypeScript**, following the **Page Object Model (POM)** design pattern. It targets the [LambdaTest eCommerce Playground](https://ecommerce-playground.lambdatest.io/) (an OpenCart-based demo store) and covers login and end-to-end order creation flows.

## Tech Stack

- **Test Runner:** [Playwright Test](https://playwright.dev/)
- **Language:** TypeScript
- **Design Pattern:** Page Object Model (POM)
- **Browser:** Chromium (headed)
- **Reporter:** HTML

## Project Structure

```
.
├── PageObjects/                  # Page classes — locators + actions for each page
│   ├── LandingPage.ts
│   ├── LoginPage.ts
│   ├── MyAccountPage.ts
│   ├── Home1Page.ts
│   ├── SearchResultPage.ts
│   ├── ProductDetailsPage.ts
│   ├── CheckoutPage.ts
│   ├── ConfirmationPage.ts
│   └── BookingConfirmationPage.ts
├── tests/
│   ├── auth.setup.ts             # Logs in once, saves session to tests/.auth/user.json
│   ├── LoginApp.spec.ts          # Login flow test
│   └── CreateOrder.spec.ts       # End-to-end search → checkout → order confirmation
├── playwright.config.ts          # Playwright configuration
├── package.json
└── package-lock.json
```

## Key Design Decisions

- **Page Object Model:** Every page on the site under test has a corresponding class in `PageObjects/`, exposing readonly `Locator` fields and action/assertion methods. Test specs only orchestrate page objects — no raw locators or assertions live in the spec files.
- **Authenticated session reuse:** `tests/auth.setup.ts` is registered as a Playwright `setup` project that runs before the `chromium` project (see `dependencies: ['setup']` in `playwright.config.ts`). It logs in once and persists the browser storage state to `tests/.auth/user.json`. `CreateOrder.spec.ts` then reuses that session via `test.use({ storageState: authFile })`, avoiding a repeated login for every test.
- **Launch options:** Chromium runs headed (`headless: false`) and maximized (`--start-maximized`), with screenshots on every run and traces captured on first retry — useful for debugging locally.

## Test Coverage

**| Spec | Flow |**
| `LoginApp.spec.ts` | Navigate to store → open login from My Account menu → log in → verify My Account page |
| `CreateOrder.spec.ts` | (Authenticated) Search for a product → verify results → pick an in-stock item → Buy Now → accept T&C → confirm order → verify order success message |

## Prerequisites

- Node.js (LTS recommended)
- npm

## Setup

```bash
git clone https://github.com/vignesh123-design/Playwright-TS---Automation-Testing-Framework-POM-.git
cd Playwright-TS---Automation-Testing-Framework-POM-
npm install
npx playwright install
```

## Running Tests

Run the full suite (setup project runs first automatically, then chromium):

```bash
npx playwright test
```

Run a specific spec:

```bash
npx playwright test tests/LoginApp.spec.ts
```

Run in UI mode (great for debugging locators):

```bash
npx playwright test --ui
```

View the HTML report after a run:

```bash
npx playwright show-report
```

## Configuration Notes

- `testDir`: `./tests`
- Default timeout: 30s (test + expect)
- Reporter: HTML
- Screenshots: on every test
- Trace: captured on first retry
- Only the `chromium` project is currently active; Firefox, WebKit, and mobile viewport projects are scaffolded but commented out in `playwright.config.ts`.

## Roadmap / Possible Improvements

- [ ] Add `npm` scripts (`test`, `test:ui`, `report`) to `package.json` — currently empty
- [ ] Add a `.env` file + `dotenv` for credentials instead of hardcoded login values
- [ ] Enable cross-browser runs (Firefox, WebKit)
- [ ] Add a `BasePage` class for shared page behavior
- [ ] Add a GitHub Actions CI workflow to run tests on push/PR
- [ ] Add API-level setup (via `APIRequestContext`) as an alternative to UI-based `auth.setup.ts`

## License

ISC
