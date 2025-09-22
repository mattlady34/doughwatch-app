# doughwatch-app

A Shopify app that monitors checkout flows by running automated tests through your store's purchase funnel, alerting you when customers can't complete their orders.

## Setup

### Project Details
- **Project name**: doughwatch-app
- **Platform**: Gadget.dev (Shopify App)
- **Language**: Node.js/TypeScript

### Required Gadget Secrets
Add these secrets in Gadget → Settings → Secrets:

**Required:**
- `ENCRYPTION_KEY` - 32+ character random string for encrypting access tokens
- `BROWSERLESS_TOKEN` - API token from Browserless.io for running Playwright tests

**Optional:**
- `POSTMARK_SERVER_TOKEN` - For sending email alerts (optional for MVP)
- `R2_ACCESS_KEY_ID` - Cloudflare R2 access key for artifact storage
- `R2_SECRET_ACCESS_KEY` - Cloudflare R2 secret key
- `R2_BUCKET` - R2 bucket name (e.g., doughwatch-artifacts)
- `R2_REGION` - R2 region (e.g., auto or your CF region)
- `INTERNAL_SLACK_WEBHOOK` - Internal ops channel webhook URL

### Shopify Configuration

**Scopes (MVP):**
- `read_products` (required)
- `read_themes` (optional - for future theme-publish triggers)

**App URLs:**
1. In Gadget, copy the App URL and OAuth callback URL from your app settings
2. In Shopify Partner Dashboard → Your App → App setup:
   - Paste **App URL** into the "App URL" field
   - Paste **OAuth callback URL** into the "Allowed redirection URL(s)" field

**Webhooks:**
- Subscribe to `app/uninstalled` webhook in Gadget (Shopify events section)

### Third-Party Services

**Browserless.io:**
- Create account at browserless.io
- Copy API Token → add as `BROWSERLESS_TOKEN` in Gadget secrets

**Slack (for alerts):**
- Create a channel (e.g., #doughwatch-alerts)
- Create Incoming Webhook → copy URL for merchant alert configuration

**Postmark (optional for MVP):**
- Create server → verify FROM email → copy Server Token as `POSTMARK_SERVER_TOKEN`

**Cloudflare R2 (optional for artifact storage):**
- Create bucket: doughwatch-artifacts
- Create S3 API keys → add as R2_* secrets in Gadget

## Admin URLs and Embedding

The embedded admin interface will mount the monitoring tabs (Monitoring, Alerts, Run History) within the Shopify admin. OAuth install flow will redirect merchants to the admin interface after successful installation (actual route will be determined on Day 3-5).
