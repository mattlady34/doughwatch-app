// Day 2 - Alerts tab with load/save and working test alert
// Manages notification settings with validation and test functionality

import React, { useState, useEffect } from 'react';
import { validateSettings } from '../../utils/validation';
import { sendTestAlert } from '../../actions/sendAlert';
import { ShopSettings, defaultSettings } from '../../schemas/settingsSchema';

export const Alerts: React.FC = () => {
  const [settings, setSettings] = useState<ShopSettings>(defaultSettings);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  // TODO: Replace with actual values
  const shopId = 'current-shop-id';

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
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    setErrors({});

    // Validate alert settings
    const validation = validateSettings(settings);
    if (!validation.ok && validation.errors) {
      const alertErrors: Record<string, string> = {};
      if (validation.errors.slackWebhookUrl) {
        alertErrors.slackWebhookUrl = validation.errors.slackWebhookUrl;
      }
      if (validation.errors.alertEmail) {
        alertErrors.alertEmail = validation.errors.alertEmail;
      }
      
      if (Object.keys(alertErrors).length > 0) {
        setErrors(alertErrors);
        setSaveStatus('error');
        return;
      }
    }

    try {
      // TODO: Replace with actual Gadget API call
      // await api.shop.update(shopId, { 
      //   settings: {
      //     ...existingSettings,
      //     slackWebhookUrl: settings.slackWebhookUrl,
      //     alertEmail: settings.alertEmail
      //   }
      // });
      console.log('Saving alert settings:', {
        slackWebhookUrl: settings.slackWebhookUrl,
        alertEmail: settings.alertEmail
      });
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save alert settings:', error);
      setSaveStatus('error');
    }
  };

  const handleTestAlert = async () => {
    setTestStatus('sending');
    setTestMessage('');

    try {
      const result = await sendTestAlert(shopId);
      
      if (result.success) {
        setTestStatus('success');
        setTestMessage(`✅ ${result.message}`);
      } else {
        setTestStatus('error');
        setTestMessage(`❌ ${result.message}`);
      }
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setTestStatus('idle');
        setTestMessage('');
      }, 5000);
    } catch (error) {
      console.error('Test alert failed:', error);
      setTestStatus('error');
      setTestMessage('❌ Failed to send test alert');
      
      setTimeout(() => {
        setTestStatus('idle');
        setTestMessage('');
      }, 5000);
    }
  };

  const canTestAlert = () => {
    return (settings.slackWebhookUrl && settings.slackWebhookUrl.trim() !== '') ||
           (settings.alertEmail && settings.alertEmail.trim() !== '');
  };

  if (loading) {
    return <div className="alerts-panel">Loading settings...</div>;
  }

  return (
    <div className="alerts-panel">
      <h2>Alert Settings</h2>
      
      <div className="setting-group">
        <label>
          Slack Webhook URL:
          <input
            type="url"
            value={settings.slackWebhookUrl}
            onChange={(e) => handleSettingChange('slackWebhookUrl', e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
            style={errors.slackWebhookUrl ? { borderColor: 'red' } : {}}
          />
        </label>
        {errors.slackWebhookUrl && (
          <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
            {errors.slackWebhookUrl}
          </div>
        )}
        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          Optional. Get webhook URL from Slack → Apps → Incoming Webhooks
        </div>
      </div>

      <div className="setting-group">
        <label>
          Alert Email:
          <input
            type="email"
            value={settings.alertEmail}
            onChange={(e) => handleSettingChange('alertEmail', e.target.value)}
            placeholder="alerts@yourstore.com"
            style={errors.alertEmail ? { borderColor: 'red' } : {}}
          />
        </label>
        {errors.alertEmail && (
          <div className="error-message" style={{ color: 'red', fontSize: '14px' }}>
            {errors.alertEmail}
          </div>
        )}
        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          Optional. Requires Postmark configuration for email delivery
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

        <button 
          onClick={handleTestAlert}
          disabled={!canTestAlert() || testStatus === 'sending'}
          title={!canTestAlert() ? 'Configure Slack webhook URL or alert email first' : ''}
          style={{
            padding: '8px 16px',
            backgroundColor: canTestAlert() ? '#28a745' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: canTestAlert() && testStatus !== 'sending' ? 'pointer' : 'not-allowed'
          }}
        >
          {testStatus === 'sending' ? 'Sending...' : 'Send Test Alert'}
        </button>
      </div>

      {testMessage && (
        <div className="test-result" style={{
          marginTop: '12px',
          padding: '8px 12px',
          borderRadius: '4px',
          backgroundColor: testStatus === 'success' ? '#d4edda' : '#f8d7da',
          border: testStatus === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
          color: testStatus === 'success' ? '#155724' : '#721c24'
        }}>
          {testMessage}
        </div>
      )}
    </div>
  );
};
