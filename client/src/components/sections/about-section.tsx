import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/section-header";
import SkillTag from "@/components/shared/skill-tag";
import { scrollToSection } from "@/lib/utils";
import { content } from "@/data/content";

export default function AboutSection() {
  return (
    <section id="about" className="section py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="About Me" 
          description="I'm a passionate software engineer with experience in creating elegant, efficient digital solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              I've always been fascinated by technology and its power to transform how we live and work. 
              This passion drove me to pursue a career in software engineering, where I've had the 
              opportunity to work on diverse projects across multiple domains.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              My experience spans from developing user-friendly front-end interfaces to implementing 
              complex back-end systems. I believe in writing clean, maintainable code and staying 
              up-to-date with the latest industry trends and best practices.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {content.skills.map((skill, index) => (
                  <SkillTag key={index} name={skill} />
                ))}
              </div>
            </div>

            <Button 
              className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              onClick={() => scrollToSection("contact")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Get In Touch
            </Button>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-purple-400 dark:bg-blue-500 bg-opacity-20 rounded-lg"></div>
              <div className="relative z-10 w-full max-w-md rounded-lg shadow-xl overflow-hidden">
                <svg className="w-full h-64 text-gray-300 dark:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
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
