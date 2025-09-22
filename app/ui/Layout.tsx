// TODO: Day 1 - Admin Layout with tabs and content area
// This component will render the main admin interface with 3 tabs

import React, { useState } from 'react';
import { Monitoring } from './Monitoring';
import { Alerts } from './Alerts';
import { RunHistory } from './RunHistory';

type TabType = 'monitoring' | 'alerts' | 'runHistory';

export const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('monitoring');

  const tabs = [
    { id: 'monitoring' as TabType, label: 'Monitoring', component: Monitoring },
    { id: 'alerts' as TabType, label: 'Alerts', component: Alerts },
    { id: 'runHistory' as TabType, label: 'Run History', component: RunHistory },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Monitoring;

  return (
    <div className="admin-layout">
      {/* TODO: Style with proper CSS/Tailwind classes */}
      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Placeholder content area */}
      <div className="tab-content">
        <ActiveComponent />
      </div>
    </div>
  );
};
