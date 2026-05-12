/**
 * utils.ts — shared utility functions for the React frontend.
 *
 * Contains helpers for:
 *  - Merging Tailwind CSS class names (cn)
 *  - Smooth-scrolling to page sections (scrollToSection)
 *  - Getting the current calendar year (getCurrentYear)
 *  - Submitting the contact form to the backend API (sendContactEmail)
 */

// clsx builds a class string from conditional values (arrays, objects, strings, etc.)
import { type ClassValue, clsx } from "clsx";

// twMerge de-duplicates conflicting Tailwind classes (e.g. "p-2 p-4" → "p-4")
import { twMerge } from "tailwind-merge";

/**
 * cn — combines multiple class name inputs and resolves Tailwind conflicts.
 * Used throughout components to compose dynamic className strings safely.
 *
 * @param inputs - Any number of class values (strings, arrays, objects…)
 * @returns        A single, de-duplicated class name string.
 */
export function cn(...inputs: ClassValue[]) {
  // First pass: clsx collapses the varied input formats into one string
  // Second pass: twMerge removes any conflicting Tailwind utilities
  return twMerge(clsx(inputs));
}

/**
 * scrollToSection — smoothly scrolls the viewport to the section with the given ID.
 * Used by nav links and call-to-action buttons so clicking them animates the scroll.
 *
 * @param sectionId - The HTML `id` attribute of the target section (e.g. "about").
 */
export function scrollToSection(sectionId: string) {
  // Find the DOM element that has the matching id attribute
  const section = document.getElementById(sectionId);

  // Only scroll if the element actually exists in the DOM (guard against typos)
  if (section) {
    // The "smooth" behaviour triggers CSS scroll animation instead of an instant jump
    section.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * getCurrentYear — returns the current calendar year as a number.
 * Used in the footer to keep the copyright year automatically up to date.
 *
 * @returns The four-digit current year (e.g. 2025).
 */
export function getCurrentYear(): number {
  // Create a new Date for right now and extract only the year component
  return new Date().getFullYear();
}

/**
 * sendContactEmail — submits the contact form data to the backend API.
 *
 * Makes a POST request to /api/contact with the form fields as a JSON body.
 * The server validates the data and sends an email via SendGrid — no database is used.
 *
 * @param name    - The sender's full name.
 * @param email   - The sender's email address.
 * @param subject - The subject of the message.
 * @param message - The body of the message.
 *
 * @returns A Promise that resolves to an object with:
 *   { success: true,  message: "Thank you..." }  on success
 *   { success: false, message: "<error text>" }  on failure
 */
export async function sendContactEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  try {
    // Send a POST request to the Express API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST', // HTTP method — POST is required for form submissions

      // Tell the server the body is JSON so it parses it correctly
      headers: {
        'Content-Type': 'application/json',
      },

      // Serialise the four form fields into a JSON string for the request body
      body: JSON.stringify({
        name,     // Sender's full name
        email,    // Sender's email address
        subject,  // Message subject
        message   // Message body
      }),
    });

    // Parse the JSON response body returned by the server
    const data = await response.json();

    // If the HTTP status code indicates an error (4xx or 5xx), throw with the server's message
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message');
    }

    // The request succeeded — return a user-friendly success payload
    return {
      success: true,
      message: "Thank you for your message. I'll get back to you soon!",
    };

  } catch (error) {
    // Log the raw error for debugging purposes (visible in the browser console)
    console.error('Error sending message:', error);

    // Return a failure payload; use the caught error's message if it is an Error instance,
    // otherwise fall back to a generic string so the UI always has something to display
    return {
      success: false,
      message: error instanceof Error
        ? error.message
        : "Failed to send message. Please try again later.",
    };
  }
}
