'use client';

import { useEffect, useState } from 'react';
import tagData from '@/content/tags.json';
import Link from 'next/link';

const Skills = () => {
  const [renderedTags, setRenderedTags] = useState([]);

  useEffect(() => {
    setRenderedTags(
      tagData.map((tag, index) => (
        <Link
          key={index}
          href={`/[tag]`}
          as={`/${tag.text}`}
          style={{
            backgroundColor: tag.color,
            color: 'white',
            borderRadius: '9999px',
            padding: '0.5rem 1rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
          }}
          className="hover:opacity-50 inline-block"
        >
          {tag.text}
        </Link>
      ))
    );
  }, []);

  return (
    <>
      <h1 className="markdown-h1">Skills</h1>
      <div className="flex flex-wrap gap-1 justify-center bg-cBlock shadow-md rounded-xl p-2">
        {renderedTags}
      </div>
    </>
  );
};

export default Skills;