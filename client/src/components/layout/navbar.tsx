/**
 * navbar.tsx — the fixed top navigation bar for the portfolio.
 *
 * Features:
 *  - Shrinks with a drop shadow when the user scrolls down (scroll-aware styling)
 *  - Smooth-scrolls to the target section when a nav link is clicked
 *  - Toggles between light and dark theme via a sun/moon icon button
 *  - Collapses into a hamburger menu on mobile viewports
 */

// useState tracks component-level reactive state; useEffect runs side effects after render
import { useState, useEffect } from "react";

// Custom hook that reads and toggles the current theme ("light" | "dark")
import { useThemeToggle } from "@/hooks/use-theme";

// Lucide icon components used for the moon (dark mode), sun (light mode), and menu icons
import { Moon, Sun, Menu } from "lucide-react";

// shadcn/ui Button for consistent, accessible button styling
import { Button } from "@/components/ui/button";

// Utility that smooth-scrolls the viewport to any section by its DOM id
import { scrollToSection } from "@/lib/utils";

/**
 * Navbar — renders the fixed header that stays at the top of the viewport at all times.
 */
export default function Navbar() {

  // Destructure the current theme name and the function that flips it from the custom hook
  const { theme, toggleTheme } = useThemeToggle();

  // isScrolled tracks whether the user has scrolled more than 10px from the top
  // When true, the navbar gets a tighter padding and a drop shadow
  const [isScrolled, setIsScrolled] = useState(false);

  // isMobileMenuOpen tracks whether the hamburger menu is expanded on small screens
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Attach a scroll listener once on mount to update isScrolled as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true once the page has scrolled more than 10px
      setIsScrolled(window.scrollY > 10);
    };

    // Register the handler on the window scroll event
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove the listener when the Navbar unmounts to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);

  }, []); // Empty array = run only once on mount

  /**
   * handleNavClick — scrolls to the target section and collapses the mobile menu.
   *
   * @param sectionId - The DOM id of the section to scroll to (e.g. "about").
   */
  const handleNavClick = (sectionId: string) => {
    // Trigger the smooth-scroll utility
    scrollToSection(sectionId);
    // Close the mobile dropdown menu after the user picks a link
    setIsMobileMenuOpen(false);
  };

  return (
    // <header> is fixed so it overlays all content and stays visible while scrolling
    // Padding and shadow change based on whether the user has scrolled away from the top
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "py-2 shadow-md" : "py-4"
    } bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 bg-blur`}>

      {/* Centered container with horizontal padding */}
      <div className="container mx-auto px-4">

        {/* Flex row: logo on the left, nav links in the centre, icons on the right */}
        <div className="flex justify-between items-center">

          {/* Site logo / brand name — clicking scrolls back to the top */}
          <a href="#" className="text-2xl font-bold">
            {/* "James" rendered in the primary brand colour */}
            <span className="text-primary">James</span>
            {/* "Anunda" rendered in a complementary blue */}
            <span className="text-blue-600">Anunda</span>
          </a>

          {/* Desktop navigation — hidden on small screens, shown on md and above */}
          <nav className="hidden md:flex space-x-8">

            {/* Home link — scrolls to the #home section */}
            <a
              href="#home"
              className="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault(); // Stop the browser from changing the URL hash
                handleNavClick("home"); // Smooth-scroll instead
              }}
            >
              Home
            </a>

            {/* About link — scrolls to the #about section */}
            <a
              href="#about"
              className="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
            >
              About
            </a>

            {/* Projects link — scrolls to the #projects section */}
            <a
              href="#projects"
              className="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("projects");
              }}
            >
              Projects
            </a>

            {/* Contact link — scrolls to the #contact section */}
            <a
              href="#contact"
              className="nav-link text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
            >
              Contact
            </a>

          </nav>

          {/* Right-side controls: theme toggle + mobile hamburger menu button */}
          <div className="flex items-center space-x-4">

            {/* Theme toggle button — renders a Moon icon in dark mode, Sun in light mode */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme} // Flips the theme between "light" and "dark"
              aria-label="Toggle theme" // Accessible label for screen readers
            >
              {/* Conditionally render the icon that represents the CURRENT theme */}
              {theme === "dark" ? (
                // Dark mode is active: show Moon icon in a soft blue
                <Moon className="h-5 w-5 text-blue-300" />
              ) : (
                // Light mode is active: show Sun icon in a warm yellow
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
            </Button>

            {/* Hamburger menu button — only visible on screens smaller than md breakpoint */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden" // Hidden on medium screens and above (desktop nav takes over)
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle the dropdown
              aria-label="Toggle menu"
            >
              {/* Menu (hamburger) icon from Lucide */}
              <Menu className="h-5 w-5" />
            </Button>

          </div>
        </div>
      </div>

      {/* Mobile dropdown menu — conditionally rendered when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        // Shown only on screens below md; rounded bottom corners for a card-like look
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-lg transition-all duration-300 overflow-hidden">
          {/* Vertical list of nav links with consistent padding */}
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">

            {/* Mobile Home link */}
            <a
              href="#home"
              className="py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home"); // Scroll and close the menu
              }}
            >
              Home
            </a>

            {/* Mobile About link */}
            <a
              href="#about"
              className="py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
            >
              About
            </a>

            {/* Mobile Projects link */}
            <a
              href="#projects"
              className="py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("projects");
              }}
            >
              Projects
            </a>

            {/* Mobile Contact link */}
            <a
              href="#contact"
              className="py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
            >
              Contact
            </a>

          </div>
        </div>
      )}

    </header>
  );
}
