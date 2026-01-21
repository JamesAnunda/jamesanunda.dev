import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/section-header";
import ProjectCard from "@/components/shared/project-card";
import { content } from "@/data/content";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="My Projects" 
          description="Here are some of the projects I've worked on. Each represents different challenges and solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              detailsUrl={project.detailsUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-primary dark:text-blue-400 border border-primary dark:border-blue-400 font-medium shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
