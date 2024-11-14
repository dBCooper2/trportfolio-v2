"use client";

import React from "react";
import { useRouter } from "next/navigation";
import tagData from "@/content/tags.json";

export default function ArticleCard({ article }) {
  const { push } = useRouter();

  const handleArticleClick = () => {
    push(`./blog/${article.slug}`);
  };

  return (
    <div>
      <a href={`/articles/${article.slug}`}>
        <div className="bg-cBlock p-2 rounded-lg shadow-md mb-4 cursor-pointer">
          <h3 className="markdown-h3">{article.title}</h3>
          <p className="markdown-paragraph">{article.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag, index) => {
              const tagInfo = tagData.find(
                (t) => t.text.toLowerCase() === tag.toLowerCase(),
              );
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: tagInfo ? tagInfo.color : "#2142ab",
                    color: "white",
                    borderRadius: "9999px",
                    padding: "0.25rem 0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </a>
    </div>
  );
}
