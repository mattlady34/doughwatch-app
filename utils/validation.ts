// Day 2 - Validation helper functions
// Provides validation utilities for settings and other data

import { settingsSchema, ShopSettings } from '../schemas/settingsSchema';

export interface ValidationResult {
  ok: boolean;
  errors?: Record<string, string>;
}

/**
 * Validates shop settings against the schema
 * @param settings - The settings object to validate
 * @param shopDomain - Optional shop domain for productURL validation
 * @returns Validation result with errors if any
 */
export const validateSettings = (
  settings: Partial<ShopSettings>, 
  shopDomain?: string
): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate each field according to schema
  for (const [fieldName, fieldSchema] of Object.entries(settingsSchema)) {
    const value = settings[fieldName as keyof ShopSettings];
    
    // Check required fields
    if (fieldSchema.required && (value === undefined || value === null)) {
      errors[fieldName] = `${fieldName} is required`;
      continue;
    }

    // Skip validation for empty optional fields
    if (!fieldSchema.required && (value === undefined || value === null || value === '')) {
      continue;
    }

    // Type validation
    if (value !== undefined && value !== null) {
      if (fieldSchema.type === 'boolean' && typeof value !== 'boolean') {
        errors[fieldName] = `${fieldName} must be a boolean`;
        continue;
      }
      
      if (fieldSchema.type === 'number' && typeof value !== 'number') {
        errors[fieldName] = `${fieldName} must be a number`;
        continue;
      }
      
      if (fieldSchema.type === 'string' && typeof value !== 'string') {
        errors[fieldName] = `${fieldName} must be a string`;
        continue;
      }
    }

    // Enum validation
    if ('enum' in fieldSchema && fieldSchema.enum && value !== undefined) {
      if (!fieldSchema.enum.includes(value as any)) {
        errors[fieldName] = fieldSchema.message || `${fieldName} must be one of: ${fieldSchema.enum.join(', ')}`;
        continue;
      }
    }

    // Custom validation function
    if ('validate' in fieldSchema && fieldSchema.validate && value !== undefined) {
      const validationResult = fieldSchema.validate(value as any, settings as ShopSettings);
      if (validationResult !== true) {
        errors[fieldName] = validationResult;
        continue;
      }
    }
  }

  // Additional cross-field validation
  if (settings.enabled && settings.productURL && shopDomain) {
    const productURLError = validateProductURLDomain(settings.productURL, shopDomain);
    if (productURLError) {
      errors.productURL = productURLError;
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
};

/**
 * Validates that productURL belongs to the same shop domain
 * @param productURL - The product URL to validate
 * @param shopDomain - The shop domain (e.g., "mystore.myshopify.com")
 * @returns Error message if invalid, null if valid
 */
export const validateProductURLDomain = (productURL: string, shopDomain: string): string | null => {
  try {
    const url = new URL(productURL);
    const urlHostname = url.hostname.toLowerCase();
    const expectedDomain = shopDomain.toLowerCase();
    
    if (urlHostname !== expectedDomain) {
      return `Product URL must be from your shop domain (${shopDomain})`;
    }
    
    return null;
  } catch (e) {
    return 'Invalid product URL format';
  }
};

/**
 * Checks if alert channels are configured
 * @param settings - Shop settings to check
 * @returns Warning message if no channels configured, null otherwise
 */
export const checkAlertChannels = (settings: ShopSettings): string | null => {
  const hasSlack = settings.slackWebhookUrl && settings.slackWebhookUrl.trim() !== '';
  const hasEmail = settings.alertEmail && settings.alertEmail.trim() !== '';
  
  if (!hasSlack && !hasEmail) {
    return 'No alert channels configured. Add Slack webhook URL or email to receive alerts.';
  }
  
  return null;
};
