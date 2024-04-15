import React from 'react';
import tagData from '@/content/tags.json';

const ProjectCard = ({ project }) => {
    return (
      <div className="bg-cBlock p-2 rounded-lg shadow-md mb-4">
        <h3 className="markdown-h3">{project.title}</h3>
        <p className="markdown-paragraph">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.skills.map((skill, index) => {
            const tagInfo = tagData.find((tag) => tag.text.toLowerCase() === skill.toLowerCase());
            return (
              <div
                key={index}
                style={{
                  backgroundColor: tagInfo ? tagInfo.color : '#ccc',
                  color: 'white',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
                className="hover:opacity-80"
              >
                {skill}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex-1 flex justify-start">
            {project.code && (
              <a
                href={project.code}
                className="markdown-link font-bold hover:font-black hover:underline mr-4"
              >
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                className={`markdown-link font-bold hover:font-black hover:underline ${
                  project.demo ? '' : 'invisible'
                }`}
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;