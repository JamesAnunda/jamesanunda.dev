/**
 * footer.tsx — the site-wide footer rendered at the bottom of every page.
 *
 * Displays a three-column dark-background footer containing:
 *  - Column 1: Brand name, tagline, and social media icon links
 *  - Column 2: Quick navigation links that smooth-scroll to page sections
 *  - Column 3: Email and location contact details
 *
 * Below the columns is a copyright bar with an auto-updating year.
 */

// getCurrentYear returns the current 4-digit year for the copyright notice
// scrollToSection triggers CSS smooth-scroll to a section by its DOM id
import { getCurrentYear, scrollToSection } from "@/lib/utils";

// Lucide icon components used throughout the footer
import { Github, Linkedin, Twitter, ChevronRight, Mail, MapPin } from "lucide-react";

/**
 * Footer — renders the full-width dark footer at the bottom of the portfolio page.
 */
export default function Footer() {

  /**
   * handleNavClick — wraps scrollToSection for use in the Quick Links column.
   * Defined here rather than inline so it can be reused across multiple buttons.
   *
   * @param sectionId - The DOM id of the target section (e.g. "home", "about").
   */
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId); // Delegate to the shared smooth-scroll utility
  };

  return (
    // Dark background footer — pt-16 gives generous top padding, pb-8 bottom breathing room
    <footer className="bg-gray-900 text-white pt-16 pb-8">

      {/* Centred container with responsive horizontal padding */}
      <div className="container mx-auto px-4">

        {/* Three-column grid — stacks to single column on mobile, three on md and above */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* COLUMN 1 — brand identity and social links */}
          <div>
            {/* Brand name in accent blue */}
            <h4 className="text-xl font-bold mb-6 text-blue-400">James Anunda</h4>

            {/* Short tagline / bio summary */}
            <p className="text-gray-400 mb-6">
              Software Engineer focused on creating elegant and efficient solutions for complex problems.
            </p>

            {/* Row of social media icon links */}
            <div className="flex space-x-4">

              {/* LinkedIn profile link — opens in a new tab safely */}
              <a
                href="https://linkedin.com"
                target="_blank"           // Open in new tab
                rel="noopener noreferrer" // Prevent the opened page from accessing window.opener
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"     // Screen reader label (no visible text)
              >
                <Linkedin className="h-5 w-5" />
              </a>

              {/* GitHub profile link */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              {/* Twitter / X profile link */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>

            </div>
          </div>

          {/* COLUMN 2 — quick navigation links */}
          <div>
            {/* Column heading */}
            <h4 className="text-xl font-bold mb-6 text-blue-400">Quick Links</h4>

            {/* Vertically spaced list of section navigation buttons */}
            <ul className="space-y-3">

              {/* Home navigation button */}
              <li>
                <button
                  onClick={() => handleNavClick("home")} // Smooth-scroll to #home
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  {/* Chevron icon acts as a visual bullet point */}
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Home
                </button>
              </li>

              {/* About navigation button */}
              <li>
                <button
                  onClick={() => handleNavClick("about")} // Smooth-scroll to #about
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  About
                </button>
              </li>

              {/* Projects navigation button */}
              <li>
                <button
                  onClick={() => handleNavClick("projects")} // Smooth-scroll to #projects
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Projects
                </button>
              </li>

              {/* Contact navigation button */}
              <li>
                <button
                  onClick={() => handleNavClick("contact")} // Smooth-scroll to #contact
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Contact
                </button>
              </li>

            </ul>
          </div>

          {/* COLUMN 3 — contact details */}
          <div>
            {/* Column heading */}
            <h4 className="text-xl font-bold mb-6 text-blue-400">Contact</h4>

            {/* Vertically spaced list of contact detail items */}
            <ul className="space-y-3">

              {/* Email address row */}
              <li className="flex items-start space-x-3">
                {/* Mail icon in the brand accent colour */}
                <Mail className="h-5 w-5 mt-1 text-blue-400" />
                {/* Static email text — update when the address changes */}
                <span className="text-gray-400">james@anunda.dev</span>
              </li>

              {/* Physical location row */}
              <li className="flex items-start space-x-3">
                {/* Map pin icon in the brand accent colour */}
                <MapPin className="h-5 w-5 mt-1 text-blue-400" />
                {/* City and state — update if location changes */}
                <span className="text-gray-400">Dallas, Texas</span>
              </li>

            </ul>
          </div>

        </div>

        {/* Copyright bar — separated from the columns by a subtle top border */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            {/* &copy; renders the © symbol; getCurrentYear() keeps the year current automatically */}
            &copy; {getCurrentYear()} James Anunda. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
