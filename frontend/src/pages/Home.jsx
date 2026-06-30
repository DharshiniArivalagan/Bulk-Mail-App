import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EmailForm from '../components/EmailForm';
import ResultDisplay from '../components/ResultDisplay';
import { sendBulkEmail } from '../services/api';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSendEmail = async (data) => {
    setIsLoading(true);
    setResults(null);
    try {
      const response = await sendBulkEmail(data.subject, data.message, data.recipients);
      setResults(response);
      toast.success('Email batch processed successfully!');
    } catch (error) {
      toast.error(error.message || 'An error occurred while sending emails.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Bulk Mail Sender</h1>
        <p>Send customized emails to multiple recipients effortlessly.</p>
      </header>

      <main>
        {!results ? (
          <EmailForm onSubmit={handleSendEmail} isLoading={isLoading} />
        ) : (
          <ResultDisplay results={results} onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default Home;
