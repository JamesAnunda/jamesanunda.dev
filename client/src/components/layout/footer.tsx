import { getCurrentYear } from "@/lib/utils";
import { scrollToSection } from "@/lib/utils";
import { Github, Linkedin, Twitter, ChevronRight, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-400">James Anunda</h4>
            <p className="text-gray-400 mb-6">
              Software Engineer focused on creating elegant and efficient solutions for complex problems.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
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
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavClick("home")}
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("about")}
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("projects")}
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("contact")}
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-400">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 text-blue-400" />
                <span className="text-gray-400">james@anunda.dev</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 text-blue-400" />
                <span className="text-gray-400">Dallas, Texas</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {getCurrentYear()} James Anunda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
