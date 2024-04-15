'use client';

import { useState } from 'react';
import tagData from '@/content/tags.json';
import { useRouter } from 'next/navigation';

const TagFilter = ({ initialTag }) => {
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleTagFilter = (newTag) => {
    setSelectedTag(newTag);
    setIsDropdownOpen(false);
    router.push(`/${newTag}`);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative w-1/4 font-oldStandardTT">
      <button
        className="bg-cBlock text-cBody px-4 py-2 rounded-md flex items-center justify-between w-full"
        onClick={handleDropdownToggle}
      >
        Filter
        <svg
          className={`ml-2 transition-transform duration-300 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15L7 10L17 10L12 15Z"
            fill="currentColor"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-cBlock rounded-md shadow-md z-10">
          {tagData.map((tag, index) => (
            <button
              key={index}
              className={`block w-full text-cBody text-left px-4 py-2 hover:bg-cBody hover:text-cBlock hover:underline hover:font-bold ${
                selectedTag === tag.text ? 'font-bold' : ''
              }`}
              onClick={() => handleTagFilter(tag.text)}
            >
              {tag.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagFilter;