# ZenduOne Login E2E Tests (Cypress)

## Setup
1. Install deps: `npm install`
2. (Optional) override creds via env vars:
   - `ZENDUIT_USERNAME`
   - `ZENDUIT_PASSWORD`
   Defaults match the demo account you provided.

## Run
- Headless regression: `npm run cypress:run`
- Interactive debug: `npm run cypress:open`

## CI (GitHub Actions)
- Workflow file: `.github/workflows/cypress.yml`
- Add repo secrets `ZENDUIT_USERNAME` and `ZENDUIT_PASSWORD` (defaults used if omitted).
- Push to GitHub; pipeline runs on every push/PR using Chrome headless.

## Scenarios covered
1. Submit with empty inputs -> shows snackbar "Username is empty".
2. Invalid credentials -> shows generic snackbar "Authenticate failed." (no account enumeration).
3. Valid credentials -> redirects to `/main/overview/map` and sets `trax_token` session cookie.

Base URL is `https://trax-beta.zenduit.com` (configured in `cypress.config.js`).
