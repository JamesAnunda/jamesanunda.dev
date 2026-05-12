/**
 * email.ts — SendGrid email service module.
 * Handles all outbound email sending for the portfolio contact form.
 * No database is involved; emails are sent directly via the SendGrid HTTP API.
 */

// Import the SendGrid mail client as a default import (CommonJS-compatible)
import mail from '@sendgrid/mail';

// Check whether the SendGrid API key has been provided in the environment
if (process.env.SENDGRID_API_KEY) {
  // If the key exists, configure the SendGrid client to use it for all requests
  mail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  // If the key is missing, log a warning so it is visible in server output
  // The app will still start, but email sending will fail until the key is provided
  console.warn('SENDGRID_API_KEY is not set. Email functionality will not work.');
}

/**
 * EmailParams — the shape of data required to send one email.
 * All fields except `text` and `html` are required.
 */
export interface EmailParams {
  // The recipient's email address (e.g. "james@anunda.dev")
  to: string;
  // The verified sender address in SendGrid (e.g. "portfolio@jamesanunda.dev")
  from: string;
  // The subject line of the email
  subject: string;
  // Optional plain-text version of the email body (fallback for clients that can't render HTML)
  text?: string;
  // Optional HTML version of the email body (preferred by most email clients)
  html?: string;
}

/**
 * sendEmail — sends a single email via the SendGrid API.
 *
 * This function is the only outbound email gateway in the app.
 * It is called by the /api/contact route after validating the form data.
 *
 * @param params - An EmailParams object containing recipient, sender, subject, and body.
 * @returns       A Promise that resolves to `true` when the email was sent,
 *                or `false` when it failed (e.g. missing API key, network error).
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    // Guard: refuse to attempt sending if the API key was never configured
    // This prevents a confusing SendGrid SDK error and gives a clear message instead
    if (!process.env.SENDGRID_API_KEY) {
      console.error('Cannot send email: SENDGRID_API_KEY is not set');
      return false; // Signal failure to the caller
    }

    // Build the message object that SendGrid's SDK expects
    const msg = {
      to: params.to,               // Destination inbox
      from: params.from,           // Verified sender (must match SendGrid account)
      subject: params.subject,     // Email subject line
      text: params.text || '',     // Plain-text body (empty string if not provided)
      html: params.html || '',     // HTML body (empty string if not provided)
    };

    // Call the SendGrid API — this is an async network request
    await mail.send(msg);

    // Log success so it is visible in server output for monitoring/debugging
    console.log(`Email sent successfully to ${params.to}`);

    // Return true to tell the caller the email was delivered to SendGrid
    return true;

  } catch (error) {
    // Catch any network errors, API errors, or SDK exceptions
    // Log the full error object so it is visible in server output
    console.error('Error sending email:', error);

    // Return false so the route can send an appropriate error response to the browser
    return false;
  }
}
