// TODO: Day 1 - Run History tab with empty table
// This will display the history of monitoring runs

import React from 'react';

export const RunHistory: React.FC = () => {
  // TODO: Connect to actual Run model data from Gadget
  const runs: any[] = []; // Empty for now

  return (
    <div className="run-history-panel">
      <h2>Run History</h2>
      
      <table className="run-history-table">
        <thead>
          <tr>
            <th>Started</th>
            <th>Status</th>
            <th>Step</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {runs.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">
                No runs yet. Enable monitoring to start tracking runs.
              </td>
            </tr>
          ) : (
            runs.map((run, index) => (
              <tr key={index}>
                <td>{run.startedAt}</td>
                <td>{run.status}</td>
                <td>{run.step}</td>
                <td>{run.durationMs ? `${run.durationMs}ms` : '-'}</td>
                <td>
                  {/* TODO: Add view details, retry actions */}
                  <button disabled>View</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
