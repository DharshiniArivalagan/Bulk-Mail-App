import React from 'react';
import { CheckCircle, XCircle, Mail, AlertTriangle } from 'lucide-react';

const ResultDisplay = ({ results, onReset }) => {
  if (!results) return null;

  const { total, sent, failed, failedEmails } = results;

  return (
    <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {failed === 0 ? <CheckCircle className="text-success" /> : <AlertTriangle className="text-error" />}
          Operation Complete
        </h2>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="stat-box">
          <div className="stat-value text-primary">{total}</div>
          <div className="stat-label">Total Recipients</div>
        </div>
        <div className="stat-box">
          <div className="stat-value text-success">{sent}</div>
          <div className="stat-label">Sent Successfully</div>
        </div>
        <div className="stat-box">
          <div className="stat-value text-error">{failed}</div>
          <div className="stat-label">Failed</div>
        </div>
      </div>

      {failedEmails && failedEmails.length > 0 && (
        <div className="failed-list">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <XCircle size={16} /> Failed Emails
          </h3>
          <ul>
            {failedEmails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="btn" onClick={onReset} style={{ display: 'inline-flex', gap: '0.5rem' }}>
          <Mail size={18} /> Send New Batch
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
