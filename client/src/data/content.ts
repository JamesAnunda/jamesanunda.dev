/**
 * content.ts — static portfolio content data.
 *
 * All text and link data that populates the About and Projects sections lives here.
 * Keeping content separate from component logic makes it easy to update copy or
 * add new projects without touching any JSX.
 */

// The single exported object that all section components import
export const content = {

  profile: {
    githubUrl: "https://github.com/JamesAnunda",
    linkedinUrl: "https://www.linkedin.com/in/jamesanunda/",
  },

  /**
   * skills — list of technology names shown as tags in the About section.
   * Add, remove, or reorder entries here to update the skills display.
   */
  skills: [
    "JavaScript",   // Core language for both frontend and backend
    "TypeScript",   // Typed superset of JavaScript used throughout this project
    "React",        // UI library powering the frontend
    "Node.js",      // Server-side JavaScript runtime
    "Python",       // General-purpose scripting and data work
    "SQL",          // Relational database query language
    "MongoDB",      // Document-oriented NoSQL database
    "AWS",          // Amazon Web Services cloud platform
    "Docker",       // Container platform for consistent environments
    "Git"           // Version control system
  ],

  /**
   * projects — array of featured project objects rendered as cards in the Projects section.
   * Each entry maps directly to the props accepted by the ProjectCard component.
   */
  projects: [
    {
      // Display title shown at the top of the project card
      title: "E-commerce Platform",

      // Short description of what the project does and its key features
      description: "A full-featured online shopping platform with secure payment processing and inventory management.",

      // Badges rendered at the bottom of the card to highlight the tech stack used
      technologies: ["React", "Node.js", "MongoDB"],

      // URL for a detailed case study or live demo (# = not yet linked)
      detailsUrl: "#",

      // Link to the project's GitHub repository
      githubUrl: "https://github.com/JamesAnunda"
    },
    {
      title: "Task Management App",
      description: "A productivity application that helps teams organize and track their projects and tasks efficiently.",
      technologies: ["React", "Redux", "Firebase"],
      detailsUrl: "#",
      githubUrl: "https://github.com/JamesAnunda"
    },
    {
      title: "Analytics Dashboard",
      description: "A comprehensive data visualization tool that helps businesses make informed decisions based on real-time metrics.",
      technologies: ["Vue.js", "D3.js", "Express"],
      detailsUrl: "#",
      githubUrl: "https://github.com/JamesAnunda"
    }
  ]
};
