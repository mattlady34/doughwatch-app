# Operations Notes

## Cost Guardrails

### Browserless.io
- **Target budget**: $200–$300/month
- **Default test frequency**: 60 minutes per shop
- **Estimated usage**: Single shop @ 60min interval = ~24 runs/day = ~12 Browserless minutes/day
- **Scaling estimate**: ~50 active shops at default frequency should stay within budget
- **Monitoring**: Track monthly usage via Browserless dashboard

### Other Services
- **Postmark**: Transactional email - minimal cost for alerts only
- **Cloudflare R2**: Storage costs for screenshots/artifacts - ~$1-5/month typical
- **Slack**: Free tier sufficient for webhook alerts

## Support Configuration

### Support Email
**Placeholder**: support@doughwatch.app *(update with actual support email)*

### Merchant Communication
- All outbound emails should include support contact
- Alert emails should be concise and actionable
- Recovery notifications should be positive and brief

## Technical Guardrails

### MVP Scope
- **Checkout testing stops at payment page** - no actual payment submission
- **No PCI compliance required** - we never handle payment data
- **Focus on availability testing** - can customers reach checkout?

### Rate Limits
- **Per-shop concurrency**: Maximum 1 test run at a time
- **Global concurrency**: Configurable limit (start with 10 concurrent tests)
- **Failure backoff**: Progressive delays on repeated failures

### Data Retention
- **Run history**: Last 50 runs per shop (older runs auto-deleted)
- **Artifacts**: Screenshots/DOM snippets kept 7-14 days
- **Access tokens**: Encrypted at rest, purged on uninstall

## Monitoring & Health

### Key Metrics
- Enabled shops count
- Test success rate (24h)
- Average test duration
- Alert delivery rate
- Browserless usage/cost

### Operational Alerts
- High failure rates across multiple shops
- Browserless quota approaching limit
- Webhook delivery failures
- Unusual test duration spikes

---

**Last Updated**: Day 0 setup  
**Review Schedule**: Weekly during initial rollout, monthly thereafter


