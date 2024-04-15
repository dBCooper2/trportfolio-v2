import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import projects from '@/content/projects.json';

const Projects = () => {
  return (
    <div className="container mx-auto">
      <h1 className="markdown-h1">Projects</h1>
      {Object.values(projects).map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default Projects;