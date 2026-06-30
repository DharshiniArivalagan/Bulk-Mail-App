import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import Spinner from './Spinner';

const EmailForm = ({ onSubmit, isLoading }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipientsRaw, setRecipientsRaw] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const parseAndValidateEmails = () => {
    setError('');
    
    if (!subject.trim()) {
      setError('Subject is required');
      return null;
    }

    if (!message.trim()) {
      setError('Email body is required');
      return null;
    }

    if (!recipientsRaw.trim()) {
      setError('At least one recipient is required');
      return null;
    }

    // Split by comma, newline or space
    const rawList = recipientsRaw.split(/[\n, ]+/);
    
    // Clean and remove empty strings
    const cleanedList = rawList.map(email => email.trim()).filter(email => email !== '');
    
    // Deduplicate
    const uniqueEmails = [...new Set(cleanedList)];

    if (uniqueEmails.length === 0) {
      setError('No valid recipients found');
      return null;
    }

    if (uniqueEmails.length > 500) {
      setError(`Maximum 500 emails allowed. You provided ${uniqueEmails.length}.`);
      return null;
    }

    // Validate each email
    for (const email of uniqueEmails) {
      if (!validateEmail(email)) {
        setError(`Invalid email format: ${email}`);
        return null;
      }
    }

    return uniqueEmails;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmails = parseAndValidateEmails();
    
    if (validEmails) {
      onSubmit({ subject, message, recipients: validEmails });
    }
  };

  return (
    <form className="glass-card" style={{ padding: '2rem' }} onSubmit={handleSubmit}>
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="input-group">
        <label className="input-label" htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          className="input-field"
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="recipients">Recipients (comma, space or newline separated)</label>
        <textarea
          id="recipients"
          className="input-field"
          rows="4"
          placeholder="abc@gmail.com, xyz@gmail.com&#10;hello@gmail.com"
          value={recipientsRaw}
          onChange={(e) => setRecipientsRaw(e.target.value)}
          disabled={isLoading}
          style={{ resize: 'vertical' }}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="message">Email Body</label>
        <textarea
          id="message"
          className="input-field"
          rows="6"
          placeholder="Write your email content here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          style={{ resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Spinner text="Sending..." /> : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={18} /> Send Mail
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
