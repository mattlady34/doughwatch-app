// TODO: Day 1 - Alerts tab with Slack webhook URL, alert email, test button
// This will manage notification settings and test alerts

import React, { useState } from 'react';

export const Alerts: React.FC = () => {
  const [slackWebhookUrl, setSlackWebhookUrl] = useState('');
  const [alertEmail, setAlertEmail] = useState('');

  return (
    <div className="alerts-panel">
      <h2>Alert Settings</h2>
      
      {/* TODO: Connect to actual shop settings from Gadget */}
      <div className="setting-group">
        <label>
          Slack Webhook URL:
          <input
            type="url"
            value={slackWebhookUrl}
            onChange={(e) => setSlackWebhookUrl(e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
          />
        </label>
      </div>

      <div className="setting-group">
        <label>
          Alert Email:
          <input
            type="email"
            value={alertEmail}
            onChange={(e) => setAlertEmail(e.target.value)}
            placeholder="alerts@yourstore.com"
          />
        </label>
      </div>

      {/* TODO: Enable later - connect to actual alert testing */}
      <div className="setting-group">
        <button 
          disabled 
          className="test-alert-button disabled"
          title="Will be enabled in later days"
        >
          Send Test Alert
        </button>
      </div>
    </div>
  );
};
