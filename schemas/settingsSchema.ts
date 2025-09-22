// Day 2 - Settings validation schema
// Enforces strict validation rules for shop settings

export interface ShopSettings {
  enabled: boolean;
  frequencyMinutes: 30 | 60 | 120;
  productURL: string;
  slackWebhookUrl?: string;
  alertEmail?: string;
}

export const settingsSchema = {
  enabled: {
    type: 'boolean' as const,
    required: true,
  },
  frequencyMinutes: {
    type: 'number' as const,
    required: true,
    enum: [30, 60, 120],
    message: 'Frequency must be 30, 60, or 120 minutes',
  },
  productURL: {
    type: 'string' as const,
    required: false, // Only required when enabled=true
    validate: (value: string, settings: ShopSettings) => {
      if (!settings.enabled) return true; // Not required when disabled
      if (!value || value.trim() === '') {
        return 'Product URL is required when monitoring is enabled';
      }
      
      // Must be absolute URL
      try {
        const url = new URL(value);
        if (!url.protocol.startsWith('http')) {
          return 'Product URL must be a valid HTTP/HTTPS URL';
        }
        return true;
      } catch (e) {
        return 'Product URL must be a valid absolute URL';
      }
    },
  },
  slackWebhookUrl: {
    type: 'string' as const,
    required: false,
    validate: (value: string) => {
      if (!value || value.trim() === '') return true; // Optional field
      
      try {
        const url = new URL(value);
        if (!url.hostname.includes('hooks.slack.com')) {
          return 'Slack webhook URL must be from hooks.slack.com';
        }
        return true;
      } catch (e) {
        return 'Slack webhook URL must be a valid URL';
      }
    },
  },
  alertEmail: {
    type: 'string' as const,
    required: false,
    validate: (value: string) => {
      if (!value || value.trim() === '') return true; // Optional field
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Alert email must be a valid email address';
      }
      return true;
    },
  },
};

export const defaultSettings: ShopSettings = {
  enabled: false,
  frequencyMinutes: 60,
  productURL: '',
  slackWebhookUrl: '',
  alertEmail: '',
};
