# Setup Checklist

Complete these tasks before starting development:

## Shopify Configuration
☐ Shopify Dev Store URL recorded  
☐ Gadget project created: doughwatch-app  
☐ Shopify OAuth callback set to Gadget URLs  
☐ Webhook subscribed: app/uninstalled  

## Secrets Configuration
☐ Secrets present in Gadget: ENCRYPTION_KEY, BROWSERLESS_TOKEN, (POSTMARK_SERVER_TOKEN optional), (R2_* optional), (INTERNAL_SLACK_WEBHOOK optional)  

## Third-Party Services
☐ Slack Incoming Webhook created (merchant alerts)  

## Test Environment
☐ Published test product exists & URL copied  
☐ Default test frequency = 60 min  

## Verification
Once all items above are checked:
- [ ] Test OAuth install flow works
- [ ] App uninstall webhook fires correctly
- [ ] All required secrets are accessible in Gadget environment
- [ ] Test product URL loads correctly in browser

---

**Next Steps:** After completing this checklist, proceed to Day 1 development tasks.


