/**
 * about-section.tsx — the "About Me" section of the portfolio.
 *
 * Displays a two-column layout with:
 *  - Left column: biography paragraphs, a skills tag cloud, and a "Get In Touch" CTA button
 *  - Right column: a decorative image placeholder with an offset accent block
 *
 * Skill data is imported from the shared content file so it can be updated in one place.
 */

// shadcn/ui Button for consistent styling across the app
import { Button } from "@/components/ui/button";

// Reusable section title + subtitle component shared by all major sections
import SectionHeader from "@/components/shared/section-header";

// Renders a single skill badge / pill; one is created per skill string
import SkillTag from "@/components/shared/skill-tag";

// Smooth-scroll utility used by the CTA button at the bottom of the section
import { scrollToSection } from "@/lib/utils";

// Static content data — the skills array lives here so it's easy to maintain
import { content } from "@/data/content";

/**
 * AboutSection — renders the full "About Me" section.
 */
export default function AboutSection() {
  return (
    // Section element with id "about" so the scroll-spy in home.tsx can detect it
    // White background in light mode, dark gray in dark mode, with a smooth colour transition
    <section id="about" className="section py-20 bg-white dark:bg-gray-900 transition-colors">

      {/* Centred container with responsive horizontal padding */}
      <div className="container mx-auto px-4">

        {/* Shared section header component: renders the "About Me" title and subtitle */}
        <SectionHeader
          title="About Me"
          description="I'm a passionate software engineer with experience in creating elegant, efficient digital solutions."
        />

        {/* Two-column grid — stacks into a single column on mobile, two on md and above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN — biography and skills */}
          {/* order-2 on mobile so the image appears above the text; order-1 resets on md */}
          <div className="order-2 md:order-1">

            {/* Sub-heading for the text block */}
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Journey</h3>

            {/* First biography paragraph — background and motivation */}
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              I've always been fascinated by technology and its power to transform how we live and work.
              This passion drove me to pursue a career in software engineering, where I've had the
              opportunity to work on diverse projects across multiple domains.
            </p>

            {/* Second biography paragraph — technical philosophy */}
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              My experience spans from developing user-friendly front-end interfaces to implementing
              complex back-end systems. I believe in writing clean, maintainable code and staying
              up-to-date with the latest industry trends and best practices.
            </p>

            {/* Skills block — maps each skill string to a SkillTag badge */}
            <div className="mb-8">
              {/* Sub-heading for the skills cloud */}
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Technical Skills</h4>

              {/* Flex-wrap layout so badges reflow naturally across multiple lines */}
              <div className="flex flex-wrap gap-2">
                {/* Render one SkillTag per entry in content.skills */}
                {content.skills.map((skill, index) => (
                  // key=index is safe here because the skills list never reorders at runtime
                  <SkillTag key={index} name={skill} />
                ))}
              </div>
            </div>

            {/* CTA button — smooth-scrolls the user to the Contact section */}
            <Button
              className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              onClick={() => scrollToSection("contact")} // Navigate to #contact on click
            >
              {/* Inline SVG speech bubble icon — purely decorative */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Get In Touch
            </Button>

          </div>

          {/* RIGHT COLUMN — decorative image/graphic placeholder */}
          {/* order-1 on mobile so the graphic appears first; order-2 restores natural order on md */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">

              {/* Offset accent block — a coloured square rotated slightly behind the main frame */}
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-purple-400 dark:bg-blue-500 bg-opacity-20 rounded-lg"></div>

              {/* Main image frame — sits above the accent block via z-10 */}
              <div className="relative z-10 w-full max-w-md rounded-lg shadow-xl overflow-hidden">

                {/* Placeholder SVG representing a screen / monitor graphic */}
                {/* Replace with an <img> tag when a real photo or illustration is available */}
                <svg
                  className="w-full h-64 text-gray-300 dark:text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Outer rectangle representing a monitor or window frame */}
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                  {/* Vertical dividers */}
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  {/* Horizontal divider */}
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  {/* Corner accent lines creating a grid-like appearance */}
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
