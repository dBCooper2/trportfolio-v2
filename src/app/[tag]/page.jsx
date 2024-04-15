import { notFound } from 'next/navigation';
import projects from '@/content/projects.json';
import tagData from '@/content/tags.json';
import ProjectCard from '@/components/ProjectCard';
import TagFilter from '@/components/TagFilter';

export async function generateStaticParams() {
  return tagData.map((tag) => ({
    tag: tag.text,
  }));
}

const TagPage = ({ params }) => {
  const { tag } = params;
  const tagInfo = tagData.find((t) => t.text === tag);

  if (!tagInfo) {
    return notFound();
  }

  const filteredProjects = Object.values(projects).filter((project) =>
    project.skills.includes(tag)
  );

  return (
    <>
      <div className="container mx-auto px-4 sm:px-0 py-8 min-h-screen font-font">
        <div className="flex justify-between items-center mb-4">
          <h1 className="markdown-h1">Projects Using: {tag}</h1>
          <TagFilter initialTag={tag} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TagPage;