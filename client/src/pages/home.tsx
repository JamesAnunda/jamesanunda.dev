/**
 * home.tsx — the single page rendered at the root URL ("/").
 *
 * Composes the full portfolio layout from individual section components.
 * Also owns page-level side effects: the browser tab title and scroll-spy logic
 * that highlights the correct nav link as the user scrolls through sections.
 */

// useEffect lets us run side effects (DOM manipulation, event listeners) after render
import { useEffect } from "react";

// Layout shell components rendered above and below the main content
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// The four content sections that make up the portfolio page
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ProjectsSection from "@/components/sections/projects-section";
import ContactSection from "@/components/sections/contact-section";

/**
 * Home — the root page component for the portfolio.
 *
 * Renders a full-height flex column with the navbar fixed at the top,
 * all four content sections in the middle, and the footer at the bottom.
 */
export default function Home() {

  // useEffect with an empty dependency array runs once after the component mounts
  useEffect(() => {

    // Set the browser tab title so it reads clearly in bookmarks and search results
    document.title = "James Anunda - Software Engineer";

    /**
     * handleScroll — scroll-spy handler that updates which nav link looks "active".
     *
     * Called every time the user scrolls. It checks every section's vertical position
     * against the current scroll offset and adds the "active" CSS class to the matching
     * nav link while removing it from all others.
     */
    const handleScroll = () => {
      // Grab every <section> element that has an `id` attribute on the page
      const sections = document.querySelectorAll("section[id]");

      // Offset the scroll position by 100px so the active section switches slightly
      // before the section header actually hits the very top of the viewport
      const scrollPosition = window.scrollY + 100;

      // Iterate over each section and compare its position to the current scroll offset
      sections.forEach((section) => {
        // Distance from the top of the document to the top of this section
        const sectionTop = section.offsetTop;

        // The full pixel height of this section
        const sectionHeight = section.offsetHeight;

        // The id attribute value (e.g. "home", "about", "projects", "contact")
        const sectionId = section.getAttribute("id") || "";

        // Check whether the viewport's adjusted scroll position is inside this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

          // The viewport is inside this section — update the nav links accordingly
          document.querySelectorAll(".nav-link").forEach((link) => {
            // Remove "active" from every nav link first to reset all highlights
            link.classList.remove("active");

            // Re-add "active" only to the link whose href matches this section's id
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    };

    // Attach the scroll handler so it fires whenever the user scrolls the page
    window.addEventListener("scroll", handleScroll);

    // Run once immediately on mount so the correct link is active on initial load
    // (without this, no link would be active until the first scroll event)
    handleScroll();

    // Return a cleanup function — React calls this when the component unmounts
    // Removing the listener prevents memory leaks and duplicate handler calls
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []); // Empty array = run only once after the initial render

  return (
    // Outer wrapper: flex column that stretches to at least the full viewport height
    <div className="flex flex-col min-h-screen">

      {/* Fixed navigation bar rendered above all content */}
      <Navbar />

      {/* Main content area grows to fill all remaining vertical space */}
      <main className="flex-grow">

        {/* Hero section — "Hi, I'm James Anunda" introduction and call-to-action buttons */}
        <HeroSection />

        {/* About section — background paragraph and skills grid */}
        <AboutSection />

        {/* Projects section — card grid of featured work */}
        <ProjectsSection />

        {/* Contact section — contact info and the email submission form */}
        <ContactSection />

      </main>

      {/* Footer — quick links, social icons, and copyright notice */}
      <Footer />

    </div>
  );
}
