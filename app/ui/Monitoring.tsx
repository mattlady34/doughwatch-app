// TODO: Day 1 - Monitoring tab with enable toggle, frequency dropdown, product URL
// This will control the monitoring settings and manual run trigger

import React, { useState } from 'react';

export const Monitoring: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [frequency, setFrequency] = useState(60);
  const [productURL, setProductURL] = useState('');

  return (
    <div className="monitoring-panel">
      <h2>Monitoring Settings</h2>
      
      {/* TODO: Connect to actual shop settings from Gadget */}
      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Enable Monitoring
        </label>
      </div>

      <div className="setting-group">
        <label>
          Frequency (minutes):
          <select 
            value={frequency} 
            onChange={(e) => setFrequency(Number(e.target.value))}
          >
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={120}>120 minutes</option>
          </select>
        </label>
      </div>

      <div className="setting-group">
        <label>
          Product URL:
          <input
            type="url"
            value={productURL}
            onChange={(e) => setProductURL(e.target.value)}
            placeholder="https://yourstore.myshopify.com/products/..."
          />
        </label>
      </div>

      {/* TODO: Enable on Day 6 - connect to actual run action */}
      <div className="setting-group">
        <button 
          disabled 
          title="Available Day 6"
          className="run-now-button disabled"
        >
          Run Now
        </button>
      </div>
    </div>
  );
};
