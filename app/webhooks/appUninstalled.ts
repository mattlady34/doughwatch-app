// TODO: Day 1 - App uninstalled webhook handler stub
// This webhook will be called when the Shopify app is uninstalled

import { Request, Response } from 'express';

/**
 * Handles the app/uninstalled webhook from Shopify
 * TODO: Implement the following logic:
 * 1. Set shop state to 'uninstalled' in Shop model
 * 2. Clear the encryptedAccessToken
 * 3. Disable monitoring (set settings.enabled = false)
 * 4. Optionally: Clean up any scheduled jobs/webhooks
 */
export const handleAppUninstalled = async (req: Request, res: Response) => {
  try {
    // TODO: Extract shop domain from webhook payload
    const shopDomain = req.body.domain || req.headers['x-shopify-shop-domain'];
    
    if (!shopDomain) {
      console.error('App uninstalled webhook: No shop domain found');
      return res.status(400).json({ error: 'Shop domain required' });
    }

    console.log(`App uninstalled webhook received for shop: ${shopDomain}`);
    
    // TODO: Find shop by domain and update state
    // const shop = await api.shop.findFirst({ filter: { shopDomain: { equals: shopDomain } } });
    // if (shop) {
    //   await api.shop.update(shop.id, {
    //     state: 'uninstalled',
    //     encryptedAccessToken: null,
    //     settings: { ...shop.settings, enabled: false }
    //   });
    // }

    // TODO: Call purgeShop action to clean up data if needed
    // await purgeShop(shopDomain);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('App uninstalled webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
