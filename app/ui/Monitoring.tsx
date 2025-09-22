// Day 2 - Monitoring tab with CRUD operations and validation
// Wire form to load/save Shop.settings with schema validation

import React, { useState, useEffect } from 'react';
import { validateSettings, checkAlertChannels } from '../../utils/validation';
import { defaultSettings, ShopSettings } from '../../schemas/settingsSchema';

export const Monitoring: React.FC = () => {
  const [settings, setSettings] = useState<ShopSettings>(defaultSettings);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [alertWarning, setAlertWarning] = useState<string | null>(null);

  // TODO: Replace with actual Gadget API calls
  const shopId = 'current-shop-id'; // Get from context/props
  const shopDomain = 'example.myshopify.com'; // Get from shop record

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual Gadget API call
      // const shop = await api.shop.findOne(shopId);
      // const loadedSettings = shop.settings || defaultSettings;
      
      // Mock loaded settings for now
      const loadedSettings = {
        enabled: false,
        frequencyMinutes: 60 as const,
        productURL: '',
        slackWebhookUrl: '',
        alertEmail: '',
      };
      
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (field: keyof ShopSettings, value: any) => {
    const newSettings = { ...settings, [field]: value };
    setSettings(newSettings);
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }

    // Check alert channels warning when enabling
    if (field === 'enabled' && value === true) {
      const warning = checkAlertChannels(newSettings);
      setAlertWarning(warning);
    } else if (field === 'enabled' && value === false) {
      setAlertWarning(null);
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    setErrors({});
    setAlertWarning(null);

    // Validate settings
    const validation = validateSettings(settings, shopDomain);
    if (!validation.ok && validation.errors) {
      setErrors(validation.errors);
      setSaveStatus('error');
      return;
    }

    // Check for alert channels warning
    if (settings.enabled) {
      const warning = checkAlertChannels(settings);
      setAlertWarning(warning);
    }

    try {
      // TODO: Replace with actual Gadget API call
      // await api.shop.update(shopId, { settings });
      console.log('Saving settings:', settings);
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveStatus('error');
    }
  };

  if (loading) {
    return <div className="monitoring-panel">Loading settings...</div>;
  }

  return (
    <div className="monitoring-panel">
      <h2>Monitoring Settings</h2>
      
      {alertWarning && (
        <div className="alert-warning" style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          padding: '12px', 
          borderRadius: '4px', 
          marginBottom: '16px',
          color: '#856404'
        }}>
          ⚠️ {alertWarning}
        </div>
      )}

      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => handleSettingChange('enabled', e.target.checked)}
          />
          Enable Monitoring
        </label>
        {errors.enabled && (
          <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
            {errors.enabled}
          </div>
        )}
      </div>

      <div className="setting-group">
        <label>
          Frequency (minutes):
          <select 
            value={settings.frequencyMinutes} 
            onChange={(e) => handleSettingChange('frequencyMinutes', Number(e.target.value))}
          >
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={120}>120 minutes</option>
          </select>
        </label>
        {errors.frequencyMinutes && (
          <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
            {errors.frequencyMinutes}
          </div>
        )}
      </div>

      <div className="setting-group">
        <label>
          Product URL:
          <input
            type="url"
            value={settings.productURL}
            onChange={(e) => handleSettingChange('productURL', e.target.value)}
            placeholder={`https://${shopDomain}/products/...`}
            style={errors.productURL ? { borderColor: 'red' } : {}}
          />
        </label>
        {errors.productURL && (
          <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
            {errors.productURL}
          </div>
        )}
        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          Must be a product URL from your shop ({shopDomain})
        </div>
      </div>

      <div className="setting-group">
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          style={{
            padding: '8px 16px',
            marginRight: '8px',
            backgroundColor: saveStatus === 'saved' ? '#28a745' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer'
          }}
        >
          {saveStatus === 'saving' ? 'Saving...' : 
           saveStatus === 'saved' ? 'Saved!' : 'Save Settings'}
        </button>

        {/* Run Now button - disabled until Day 6 */}
        <button 
          disabled 
          title="Available Day 6"
          className="run-now-button disabled"
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'not-allowed'
          }}
        >
          Run Now
        </button>
      </div>
    </div>
  );
};
