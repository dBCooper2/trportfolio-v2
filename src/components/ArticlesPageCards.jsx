import React from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import articles from "@/content/articles.json";

export default function Articles() {
  // Sort the articles by date in descending order
  const sortedArticles = Object.values(articles).sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="container mx-auto">
      {sortedArticles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
      <div className="flex justify-start mt-4"></div>
    </div>
  );
}
