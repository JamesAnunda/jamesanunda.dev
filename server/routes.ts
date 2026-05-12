/**
 * routes.ts — API route definitions for the Express server.
 * All HTTP endpoints that the React frontend communicates with are registered here.
 * Contact form submissions are emailed directly via SendGrid; no database is used.
 */

// Type import for the Express app instance
import type { Express } from "express";

// Node.js built-in HTTP module — used to wrap Express in a raw HTTP server
import { createServer, type Server } from "http";

// In-memory storage instance (not used by the contact route, but kept for future features)
import { storage } from "./storage";

// Email helper that wraps the SendGrid SDK
import { sendEmail } from "./email";

/**
 * registerRoutes — attaches all API routes to the Express app.
 *
 * This function is called once during server startup (in server/index.ts).
 * It returns the HTTP server so it can be passed to the WebSocket/Vite layer.
 *
 * @param app - The Express application instance created in server/index.ts.
 * @returns     A Promise that resolves to the Node.js HTTP server wrapping `app`.
 */
export async function registerRoutes(app: Express): Promise<Server> {

  /**
   * POST /api/contact
   *
   * Receives a contact form submission from the frontend, validates the fields,
   * formats the email content, and sends it via SendGrid.
   *
   * Request body (JSON):
   *   name    — sender's full name (string, required)
   *   email   — sender's email address (string, required)
   *   subject — subject of the message (string, required)
   *   message — body of the message (string, required)
   *
   * Success response  → 200 { success: true,  message: "Message sent successfully" }
   * Validation error  → 400 { success: false, message: "All fields are required" }
   * Send failure      → 500 { success: false, message: "Failed to send message..." }
   */
  app.post("/api/contact", async (req, res) => {
    try {
      // Destructure the four expected fields from the parsed JSON body
      const { name, email, subject, message } = req.body;

      // Validate: every field must be present and non-empty
      // If any field is missing, respond with 400 (Bad Request) immediately
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      // Build the plain-text version of the email body
      // This is shown by email clients that cannot render HTML
      const emailContent = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `;

      // Build the HTML version of the email body
      // Newlines in the message are converted to <br> tags so line breaks are preserved
      const htmlContent = `
<h3>Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<h4>Message:</h4>
<p>${message.replace(/\n/g, '<br>')}</p>
      `;

      // Hand off to the email service — this makes an async HTTP call to SendGrid
      // `to`      is the inbox that will receive the message (James's personal email)
      // `from`    must be a verified sender domain/address in the SendGrid account
      // `subject` is prefixed so incoming emails are easy to identify at a glance
      const emailSent = await sendEmail({
        to: "james@anunda.dev",               // Destination: James's inbox
        from: "portfolio@jamesanunda.dev",    // Verified sender in SendGrid
        subject: `Portfolio Contact: ${subject}`, // Prefixed subject for easy filtering
        text: emailContent,                   // Plain-text fallback body
        html: htmlContent                     // Rich HTML body
      });

      // Check the boolean result returned by sendEmail()
      if (emailSent) {
        // SendGrid accepted the message — tell the frontend it was successful
        return res.status(200).json({
          success: true,
          message: "Message sent successfully"
        });
      } else {
        // sendEmail() returned false — the API key may be missing or SendGrid rejected it
        return res.status(500).json({
          success: false,
          message: "Failed to send message. Please try again later."
        });
      }

    } catch (error) {
      // Catch any unexpected runtime errors (e.g. malformed JSON body, internal crash)
      console.error("Error sending contact message:", error);

      // Return a generic 500 so the frontend can display a helpful error message
      return res.status(500).json({
        success: false,
        message: "Failed to send message"
      });
    }
  });

  // Wrap the Express app in a Node.js HTTP server
  // This is required by the Vite dev-server middleware and WebSocket support
  const httpServer = createServer(app);

  // Return the HTTP server to the caller (server/index.ts)
  return httpServer;
}
