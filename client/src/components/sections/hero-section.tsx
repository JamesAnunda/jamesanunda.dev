/**
 * hero-section.tsx — the first full-width section visitors see.
 *
 * Contains the headline, sub-headline, brief introduction paragraph,
 * and two call-to-action buttons that smooth-scroll to other sections.
 * A decorative avatar placeholder is shown on the right side on larger screens.
 */

// shadcn/ui Button for consistent, accessible button styling across the app
import { Button } from "@/components/ui/button";

// Utility that triggers CSS smooth-scroll to a section by its DOM id
import { scrollToSection } from "@/lib/utils";

/**
 * HeroSection — the introductory "above the fold" section of the portfolio.
 */
export default function HeroSection() {
  return (
    // Section element with the id "home" so the navbar scroll-spy can detect it
    // The gradient background transitions from white/light-blue (light) to dark grays (dark)
    <section id="home" className="section pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">

      {/* Centred container with responsive horizontal padding */}
      <div className="container mx-auto px-4">

        {/* Two-column flex layout: text on the left, avatar on the right (stacks on mobile) */}
        <div className="flex flex-col md:flex-row items-center justify-between">

          {/* Left column — headline and call-to-action buttons */}
          {/* animate-fade-in applies a CSS fade-in animation defined in index.css */}
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">

            {/* Primary headline — name is highlighted with a gradient text class */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
              Hi, I'm <span className="text-gradient">James Anunda</span>
            </h1>

            {/* Sub-headline — professional title / specialisation */}
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-700 dark:text-gray-300">
              IT professional with hands-on systems, network, scripting, and software development skills
            </h2>

            {/* Short introductory paragraph inviting collaboration */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              I support reliable IT operations—from networks and system administration to scripting,
              automation, and development work when the problem calls for it.
            </p>

            {/* CTA button row — flex-wrap ensures they stack gracefully on very small screens */}
            <div className="flex flex-wrap gap-4">

              {/* Primary CTA: scrolls to the Projects section to showcase work */}
              <Button
                size="lg"
                className="bg-primary hover:bg-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                onClick={() => scrollToSection("projects")} // Smooth-scroll to #projects
              >
                View My Work
              </Button>

              {/* Secondary CTA: scrolls to the Contact section for outreach */}
              <Button
                variant="outline" // Outlined style to visually distinguish from the primary CTA
                size="lg"
                className="bg-white dark:bg-gray-800 text-primary dark:text-blue-400 border border-primary dark:border-blue-400 font-medium shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                onClick={() => scrollToSection("contact")} // Smooth-scroll to #contact
              >
                Contact Me
              </Button>

            </div>
          </div>

          {/* Right column — decorative avatar placeholder */}
          {/* animate-slide-up applies a CSS slide-up animation defined in index.css */}
          <div className="md:w-1/2 flex justify-center animate-slide-up">
            <div className="relative">

              {/* Pulsing halo ring behind the avatar for a subtle animated accent */}
              <div className="absolute inset-0 bg-primary bg-opacity-10 rounded-full -m-6 animate-pulse"></div>

              {/* Circular frame for the avatar image or placeholder SVG */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-xl border-4 border-white dark:border-gray-800 overflow-hidden">

                {/* Generic person silhouette SVG — replace with a real <img> when a photo is available */}
                <svg
                  className="w-full h-full text-gray-200 dark:text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Person icon path: head circle + shoulders arc */}
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
