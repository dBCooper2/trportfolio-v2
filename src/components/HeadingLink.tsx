"use client";

import React from "react";

interface HeadingLinkProps {
  id: string;
  children: React.ReactNode;
  className: string;
}

export const HeadingLink = ({ id, children, className }: HeadingLinkProps) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState({}, "", `#${id}`);
    }
  };

  // Instead of rendering an anchor tag directly, wrap the content in a button
  return (
    <button
      onClick={handleClick}
      className={`${className} w-full text-left hover:opacity-80`}
    >
      {children}
    </button>
  );
};

export const InitialScrollHandler = () => {
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);
  return null;
};
