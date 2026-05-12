/**
 * projects-section.tsx — the "My Projects" section of the portfolio.
 *
 * Renders a responsive card grid where each card represents one featured project.
 * Project data is imported from the shared content file so new projects can be
 * added without touching any JSX — just update content.ts.
 *
 * A "View All Projects" button is included at the bottom for future expansion.
 */

// shadcn/ui Button for consistent button styling
import { Button } from "@/components/ui/button";

// Shared section title + subtitle component used by every major section
import SectionHeader from "@/components/shared/section-header";

// Individual project card component — one is rendered per project entry
import ProjectCard from "@/components/shared/project-card";

// Static project data array imported from the central content file
import { content } from "@/data/content";

/**
 * ProjectsSection — renders the full "My Projects" section.
 */
export default function ProjectsSection() {
  return (
    // Section element with id "projects" so the scroll-spy in home.tsx can detect it
    // Slightly different background (gray-50 / gray-800) to visually separate it from About
    <section id="projects" className="section py-20 bg-gray-50 dark:bg-gray-800 transition-colors">

      {/* Centred container with responsive horizontal padding */}
      <div className="container mx-auto px-4">

        {/* Shared section header: renders the "My Projects" title and subtitle */}
        <SectionHeader
          title="My Projects"
          description="Here are some of the projects I've worked on. Each represents different challenges and solutions."
        />

        {/* Responsive project card grid */}
        {/* 1 column on mobile → 2 on md → 3 on lg and above */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Map each project object from the content array to a ProjectCard component */}
          {content.projects.map((project, index) => (
            // key=index is fine here because the list is static and never reordered
            <ProjectCard
              key={index}
              title={project.title}             // Project display name
              description={project.description} // Short summary of the project
              technologies={project.technologies} // Tech stack badges rendered inside the card
              detailsUrl={project.detailsUrl}   // Link to a live demo or case study
              githubUrl={project.githubUrl}     // Link to the GitHub repository
            />
          ))}

        </div>

        {/* "View All Projects" button — centred below the grid */}
        <div className="text-center mt-12">
          <Button
            variant="outline" // Outlined style to complement the filled cards above
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-primary dark:text-blue-400 border border-primary dark:border-blue-400 font-medium shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
          >
            {/* Folder icon SVG — purely decorative, visually reinforces "projects" */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Folder outline path */}
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            {/* Button label — note the placeholder text indicating work in progress */}
            View All Projects ( Button still in developlment)
          </Button>
        </div>

      </div>
    </section>
  );
}
