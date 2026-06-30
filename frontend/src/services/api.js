import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends emails to multiple recipients using EmailJS.
 * Iterates sequentially through each recipient and attempts to send.
 * Continues even if some fail, and returns a full result summary.
 */
export const sendBulkEmail = async (subject, message, recipients) => {
  const results = {
    total: recipients.length,
    sent: 0,
    failed: 0,
    failedEmails: [],
  };

  for (const email of recipients) {
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: email,
          subject: subject,
          message: message,
        },
        PUBLIC_KEY
      );
      results.sent++;
    } catch (error) {
      console.error(`Failed to send to ${email}:`, error);
      results.failed++;
      results.failedEmails.push(email);
    }
  }

  return results;
};
