import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  detailsUrl: string;
  githubUrl: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  detailsUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <Card className="project-card overflow-hidden shadow-lg bg-white dark:bg-gray-900">
      <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <svg 
          className="w-24 h-24 text-gray-400 dark:text-gray-600" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <a 
            href={detailsUrl}
            className="text-primary dark:text-blue-400 font-medium inline-flex items-center hover:underline"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a 
            href={githubUrl}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label="View GitHub repository"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
