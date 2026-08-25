import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Sends a contact-form lead through FormSubmit.
 *
 * FormSubmit emails the lead without an API key, SMTP credentials, or a
 * server-side email route. The visitor's email is set as Reply-To so the
 * notification can be answered directly.
 */
export async function sendContactEmail(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  try {
    const response = await fetch("https://formsubmit.co/ajax/james@anunda.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `New portfolio lead: ${subject}`,
        _template: "table",
        _replyto: email,
        name,
        email,
        subject,
        message,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to send message");
    }

    return {
      success: true,
      message: "Thank you for your message. I'll get back to you soon!",
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
    };
  }
}
