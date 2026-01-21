/**
 * Configuration for SendGrid email service.
 * This module handles the initialization and sending of emails using the SendGrid API.
 */
import mail from '@sendgrid/mail';

// Initialize SendGrid mail service with the API key from environment variables
if (process.env.SENDGRID_API_KEY) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY is not set. Email functionality will not work.');
}

/**
 * Parameters required for sending an email.
 * @interface EmailParams
 */
export interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Sends an email using the SendGrid API.
 * This is a robust wrapper that handles errors and logs the result.
 * 
 * @param params - The email recipient, sender, subject, and content.
 * @returns A promise that resolves to true if sent successfully, false otherwise.
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('Cannot send email: SENDGRID_API_KEY is not set');
      return false;
    }
    
    const msg = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    };
    
    await mail.send(msg);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}