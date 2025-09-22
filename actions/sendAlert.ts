// Day 2 - Send test alert action
// Implements test alert functionality with Slack and Postmark support

/**
 * Sends a test alert to configured channels
 * @param shopId - The shop ID to send test alert for
 * @returns Result indicating success/failure and message
 */
export const sendTestAlert = async (shopId: string) => {
  try {
    // TODO: Replace with actual Gadget API calls
    // const shop = await api.shop.findOne(shopId);
    // Mock shop data for now
    const shop = {
      id: shopId,
      shopDomain: 'example.myshopify.com', // TODO: Get from actual shop record
      settings: {
        slackWebhookUrl: '', // TODO: Get from actual settings
        alertEmail: '', // TODO: Get from actual settings
      }
    };

    if (!shop) {
      return {
        success: false,
        message: 'Shop not found',
      };
    }

    const { slackWebhookUrl, alertEmail } = shop.settings;
    const testMessage = `DoughWatch test alert OK – ${shop.shopDomain}`;

    // Try Slack first if configured
    if (slackWebhookUrl && slackWebhookUrl.trim() !== '') {
      try {
        const slackResult = await sendSlackAlert(slackWebhookUrl, testMessage);
        if (slackResult.success) {
          return {
            success: true,
            message: 'Test alert sent successfully via Slack',
            channel: 'slack',
          };
        }
      } catch (error) {
        console.error('Slack alert failed:', error);
        // Continue to try email if Slack fails
      }
    }

    // Try Postmark if Slack unavailable or failed
    if (alertEmail && alertEmail.trim() !== '') {
      const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
      if (postmarkToken) {
        try {
          const emailResult = await sendPostmarkAlert(alertEmail, testMessage, postmarkToken);
          if (emailResult.success) {
            return {
              success: true,
              message: 'Test alert sent successfully via email',
              channel: 'email',
            };
          }
        } catch (error) {
          console.error('Postmark alert failed:', error);
        }
      }
    }

    // No channels available or all failed
    return {
      success: false,
      message: 'No alert channels configured or all channels failed',
    };

  } catch (error) {
    console.error('sendTestAlert error:', error);
    return {
      success: false,
      message: 'Internal error sending test alert',
    };
  }
};

/**
 * Sends alert via Slack webhook
 * @param webhookUrl - Slack webhook URL
 * @param message - Message to send
 * @returns Promise with success status
 */
const sendSlackAlert = async (webhookUrl: string, message: string): Promise<{success: boolean}> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
        username: 'DoughWatch',
        icon_emoji: ':warning:',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Retry once on timeout
    if (error.name === 'AbortError') {
      console.log('Slack webhook timeout, retrying...');
      return retrySlackAlert(webhookUrl, message);
    }
    
    throw error;
  }
};

/**
 * Retry Slack alert once on timeout
 */
const retrySlackAlert = async (webhookUrl: string, message: string): Promise<{success: boolean}> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
        username: 'DoughWatch',
        icon_emoji: ':warning:',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return { success: response.ok };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Slack retry failed:', error);
    return { success: false };
  }
};

/**
 * Sends alert via Postmark email
 * @param email - Recipient email
 * @param message - Message to send
 * @param token - Postmark server token
 * @returns Promise with success status
 */
const sendPostmarkAlert = async (
  email: string, 
  message: string, 
  token: string
): Promise<{success: boolean}> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': token,
      },
      body: JSON.stringify({
        From: 'alerts@doughwatch.app', // TODO: Configure from address
        To: email,
        Subject: 'DoughWatch Test Alert',
        TextBody: message,
        HtmlBody: `<p>${message}</p>`,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Postmark API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    return { success: true };
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Retry once on timeout
    if (error.name === 'AbortError') {
      console.log('Postmark timeout, retrying...');
      return retryPostmarkAlert(email, message, token);
    }
    
    throw error;
  }
};

/**
 * Retry Postmark alert once on timeout
 */
const retryPostmarkAlert = async (
  email: string, 
  message: string, 
  token: string
): Promise<{success: boolean}> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': token,
      },
      body: JSON.stringify({
        From: 'alerts@doughwatch.app',
        To: email,
        Subject: 'DoughWatch Test Alert',
        TextBody: message,
        HtmlBody: `<p>${message}</p>`,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return { success: response.ok };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Postmark retry failed:', error);
    return { success: false };
  }
};
