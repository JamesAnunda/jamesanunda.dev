import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

// Send a contact form message to the server
export async function sendContactEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message');
    }
    
    return {
      success: true,
      message: "Thank you for your message. I'll get back to you soon!",
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
    };
  }
}
