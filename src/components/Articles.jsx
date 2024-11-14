import React from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import articles from "@/content/articles.json";

export default function Articles() {
  // Sort the articles by date in descending order
  const sortedArticles = Object.values(articles).sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  // Get the first 3 articles
  const latestArticles = sortedArticles.slice(0, 3);

  return (
    <div className="container mx-auto">
      <h1 className="markdown-h1">Articles</h1>
      {latestArticles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
      <div className="flex justify-start mt-4">
        <Link
          href="/articles"
          className="markdown-link font-bold hover:font-black hover:underline"
        >
          See All Articles
        </Link>
      </div>
    </div>
  );
}
