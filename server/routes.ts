import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./email";

/**
 * Registers all API routes for the Express application.
 * This is where we define endpoints for the frontend to communicate with the backend.
 * 
 * @param app - The Express application instance.
 * @returns A promise that resolves to the created HTTP server.
 */
export async function registerRoutes(app: Express): Promise<Server> {
  /**
   * API endpoint to handle contact form submissions.
   * Validates input data and sends an email via SendGrid.
   * No database storage is used for these submissions.
   */
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate the request body
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "All fields are required" 
        });
      }
      
      // Format the email content
      const emailContent = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `;

      const htmlContent = `
<h3>Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<h4>Message:</h4>
<p>${message.replace(/\n/g, '<br>')}</p>
      `;

      // Send the email using SendGrid
      const emailSent = await sendEmail({
        to: "james@anunda.dev", // Your email
        from: "portfolio@jamesanunda.dev", // Must be a verified sender in SendGrid
        subject: `Portfolio Contact: ${subject}`,
        text: emailContent,
        html: htmlContent
      });
      
      if (emailSent) {
        return res.status(200).json({ 
          success: true, 
          message: "Message sent successfully" 
        });
      } else {
        return res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send message" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
